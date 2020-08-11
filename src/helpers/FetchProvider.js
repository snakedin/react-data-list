export  default class FetchProvider {

    /**
     * Endpoint URL
     */
    url = null;

    /**
     * HTTP method (GET, POST, PUT, DELETE)
     */
    method = 'GET';

    /**
     * CORS setup
     */
    mode = null;

    /**
     * Cache headers
     */
    cache = null;

    /**
     * Origins
     */
    credentials = null;

    /**
     * HTTP headers
     */
    headers = {
        //'Content-Type': 'application/json'
    };

    /**
     * Redirect setup
     */
    redirect = null;

    /**
     * Referrer Policy
     */
    referrerPolicy = null;

    /**
     * By default set all pager and filter values as GET-params
     */
    prepareUrlParams = (query, pager = {}, filter = {}) => {

        Object.entries(pager).forEach(([key, value]) => {
            query.append(key, value);
        });

        Object.entries(filter).forEach(([key, value]) => {
            query.append(`filter[${key}]`, value);
        });

        return query;
    };

    /**
     * By default body params are empty
     */
    prepareBodyParams = (pager = {}, filter = {}) => {
        return null;
    };

    /**
     * By default return all items from results
     */
    handleSuccess = (response) => {
        return  {
            items: response.results.map((fields) => fields),
            count: response.count
        }
    };

    /**
     * By default throw exception
     */
    handleError = (response) => {
        if (response.status === 404) {
            return  {
                items: [],
                count: 0
            }
        } else {
            throw Error(`[${response.status}]: ${response.statusText}`);
        }
    };

    /**
     * Set up params
     */
    constructor(params = {}) {
        Object.entries(params).forEach(([ key, value ]) => {
            this[key] = value;
        });
    }

    /**
     * Prepare params, execute query and return result
     */
    get = async (pager = {}, filter = {}) => {

        const query = new URL(this.url);
        const queryParams = new URLSearchParams(query.search.slice(1));
        const url = this.url.split('?')[0] + '?' + this.prepareUrlParams(queryParams, pager, filter).toString();

        // Check URL

        // Prepare init
        const fields = ['method', 'mode', 'cache', 'credentials', 'headers', 'redirect', 'referrerPolicy'];
        let init = {};

        fields.forEach(value => {
            if (this[value] !== null) {
                init[value] = this[value];
            }
        });

        // Body param
        const body = this.prepareBodyParams(pager, filter);

        if (body !== null && typeof body === 'object') {
            init['body'] = JSON.stringify(body);
        }

        // Query data
        const res = await fetch(url, init);

        if (!res.ok) {
            return this.handleError(res);
        } else {
            const response = await res.json();
            const data = this.handleSuccess(response);

            return {
                pager,
                ...data
            }
        }
    }
}
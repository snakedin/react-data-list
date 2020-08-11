import React from 'react';
import CodeWrapper from "../CodeWrapper";

function ProviderCode() {

    const codeString = `import React from 'react';
import DataList, { Column, FetchProvider } from 'react-data-list';

function ProviderExample() {
    return (
        <DataList provider={ provider.get } pageSizes={ [5, 10, 20] }>
            <Column id="id" label="ID" sort={false} filter={{ field: 'ids' }}/>
            <Column id="name" filter={{ field: 'search' }} />
            <Column id="rating" filter={false}/>
            <Column id="metacritic" sort={false} filter={false}/>
            <Column id="reviews_count" label="Reviews" sort={false} filter={false} value={ item => <a href={item.id}>{item.reviews_count} reviews</a> }/>
        </DataList>
    );
}

const provider = new FetchProvider({
    url: 'https://api.rawg.io/api/games',
    prepareUrlParams: (query, pager, filter) => {
        query.append('page', pager.page);
        query.append('page_size', pager.pageSize);
        query.append('ordering', pager.sortBy);

        Object.entries(filter).forEach(([key, value]) => {
            query.append(key, value);
        });

        return query;
    },
    handleSuccess: (response) => {
        return {
            items: response.results.map(function(item) {
                return ['id', 'name', 'rating', 'metacritic', 'reviews_count']
                    .reduce((obj, key) => ({ ...obj, [key]: item[key] }), {});
            }),
            count: response.count
        }
    }
});

export default ProviderExample;`;

    return (
        <CodeWrapper code={codeString} />
    );
}

export default ProviderCode;

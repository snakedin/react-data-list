import React, {Component} from "react";
import { withRouter } from 'react-router-dom';
import DataList from "../components/List";
import PropTypes from "prop-types";

class RouterDataList extends Component {

    static defaultProps = {
        defaultFilter: {},
        defaultPager: {
            page: 1,
            pageSize: 10,
            sortBy: '',
        }
    };

    static propTypes = {
        defaultFilter: PropTypes.object,
        defaultPager: PropTypes.shape({
            page: PropTypes.number,
            pageSize: PropTypes.number,
            sortBy: PropTypes.string,
        })
    };

    /**
     * Set pager and filter params in url hash
     */
    setLocation = (pager, filter) => {

        const { history, location: { pathname, search, hash, state }  } = this.props;
        const params = new URLSearchParams(Object.assign(pager, { filter: JSON.stringify(filter)}));

        if (search.slice(1) !== params.toString()) {
            history.push({
                pathname,
                search: params.toString(),
                hash,
                state
            });
        }
    };

    /**
     * Parse url for component params
     */
    parseParams = (location) => {

        const params = new URLSearchParams(location.search.slice(1));
        const { defaultFilter, defaultPager } = this.props;

        let data = {
            filter: { ...defaultFilter },
            pager: { ...defaultPager }
        };

        const pagerParams = ['page', 'pageSize', 'sortBy'];

        pagerParams.forEach((value => {
            if (params.get(value) !== null) {
                data.pager[value] = value === 'sortBy' ? params.get(value) : parseInt(params.get(value));
            }
        }));

        const filter = JSON.parse(params.get('filter'));

        if (filter !== null) {
            data.filter = filter;
        }

        return data;
    };

    render() {

        const { history, location, match, children, defaultPager, defaultFilter, ...props } = this.props;
        const { pager, filter } = this.parseParams(location);

        return  (
            <DataList {...props} onParamsChanged={this.setLocation} defaultFilter={ filter } defaultPager={ pager } key={ location.key }>
                { children }
            </DataList>
        );
    }
}

export default withRouter(RouterDataList);
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withOptions } from "../options/withOptions";
import Paginator from "./pager/Paginator";
import Summary from "./pager/Summary";
import SizeSwitcher from "./pager/SizeSwitcher";
import PageSwitcher from "./pager/PageSwitcher";

class PageBar extends Component {

    static propTypes = {
        page: PropTypes.number,
        pageSize: PropTypes.number,
        totalCount: PropTypes.number,
        lastPage: PropTypes.bool,
        onParamChanged: PropTypes.func
    };

    /**
     * Render element
     */
    render() {

        const {
            totalCount, lastPage, page, pageSize, onParamChanged,
            options: { showPageBar, renderPageBar }
        } = this.props;

        if (showPageBar === false || totalCount === 0) {
            return '';
        }

        let paginator;
        let summary;

        // If lastPage param was set, we will use Prev/Next mode instead of classic pagination
        if (lastPage !== undefined && lastPage !== null && typeof lastPage === "boolean") {
            paginator = <PageSwitcher page={ page } lastPage={ lastPage } onParamChanged={ onParamChanged } />;
        } else {
            paginator = <Paginator page={ page } pageSize={ pageSize } totalCount={ totalCount } onParamChanged={ onParamChanged } />;
            summary = <Summary page={ page }  pageSize={ pageSize } totalCount={ totalCount }/> ;
        }

        const sizeSwitcher = <SizeSwitcher pageSize={ pageSize } onParamChanged={ onParamChanged }/>;

        if (typeof renderPageBar === 'function') {
            return renderPageBar(paginator, summary, sizeSwitcher);
        } else {
            return (
                <div className="row align-items-center mb-3 no-gutters">
                    <div className="col-12 col-lg-4 order-2 order-lg-1 text-left mb-3">{ paginator }</div>
                    <div className="col-12 col-lg-4 order-1 order-lg-2 text-center mb-3">{ summary }</div>
                    <div className="col-2 offset-5 col-lg-1 order-3 offset-lg-3 text-right mb-3">{ sizeSwitcher }</div>
                </div>
            );
        }
    }
}

export default withOptions(PageBar);
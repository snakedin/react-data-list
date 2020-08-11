import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withOptions } from "../../options/withOptions";

class Summary extends Component {

    static propTypes = {
        page: PropTypes.number,
        pageSize: PropTypes.number,
        totalCount: PropTypes.number
    };

    render() {

        const {
            page, pageSize, totalCount,
            options, options: { renderPageSummary }
        } = this.props;

        const begin = page*pageSize - pageSize + 1;
        let end = page*pageSize;

        if (end > totalCount) {
            end = totalCount;
        }

        if (typeof renderPageSummary === 'function') {
            return renderPageSummary(begin, end, totalCount);
        } else {
            return (
                <span dangerouslySetInnerHTML={{ __html: options.translate('pageSummary', { begin, end, totalCount }) }}/>
            );
        }
    }
}

export default withOptions(Summary);
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withOptions } from "../../options/withOptions";

class Paginator extends Component {

    static propTypes = {
        page: PropTypes.number,
        pageSize: PropTypes.number,
        totalCount: PropTypes.number,
        onParamChanged: PropTypes.func
    };

    /**
     * Determine pages set to show
     */
    getPageSet(totalPages, pageShowMax, currentPage) {

        let pageFrom = 1;
        let pageTo = totalPages;
        let pageSet = [];

        if (totalPages > pageShowMax) {

            let halfPage = Math.floor(pageShowMax / 2);

            if (currentPage > halfPage && currentPage <= (totalPages - halfPage)) {
                pageFrom = currentPage - halfPage;
                pageTo = pageFrom + pageShowMax - 1;
            } else if (currentPage <= halfPage) {
                pageFrom = 1;
                pageTo = pageFrom + pageShowMax - 1;
            } else if (currentPage >= (totalPages - halfPage)) {
                pageTo = totalPages;
                pageFrom = pageTo - pageShowMax + 1;
            }
        }

        for (let i = pageFrom;  i <= pageTo; i++) {
            pageSet.push(i);
        }

        return pageSet;
    }

    /**
     * Render previous page button
     */
    getPreviousButton() {

        const { page, onParamChanged } = this.props;
        const label = (
            <span aria-hidden="true">&laquo;</span>
        );

        if (page <= 1) {
            return (
                <li className="page-item disabled" key="prev">
                    <button className="page-link" tabIndex="-1">{label}</button>
                </li>
            )
        } else {
            return (
                <li className="page-item" key="prev">
                    <button className="page-link" aria-label="Previous" onClick={ () => { onParamChanged('page', page-1) } }>{label}</button>
                </li>
            );
        }
    };

    /**
     * Render next page button
     */
    getNextButton(totalPages) {

        const { page, onParamChanged } = this.props;
        const label = (
            <span aria-hidden="true">&raquo;</span>
        );

        if (page === totalPages) {
            return (
                <li className="page-item disabled" key="next">
                    <button className="page-link" tabIndex="-1">{label}</button>
                </li>
            )
        } else {
            return (
                <li className="page-item" key="next">
                    <button className="page-link" aria-label="Next" onClick={ () => { onParamChanged('page', page+1) } }>{label}</button>
                </li>
            );
        }
    };

    /**
     * Render element
     */
    render() {

        const {
            totalCount, page, pageSize, onParamChanged,
            options: { classNamePager, pageShowMax, showPageNext, showPagePrevious }
        } = this.props;

        const totalPages = Math.ceil(totalCount / pageSize);
        let pager = [];

        if (totalPages > 1) {

            // Previous page
            if (showPagePrevious) {
                pager.push(this.getPreviousButton());
            }

            // Pager
            const pageSet = this.getPageSet(totalPages, pageShowMax, page);

            pageSet.forEach((value) => {
                let className = 'page-item';

                if (page === value)
                    className += ' active';

                pager.push((
                    <li key={value} className={className}>
                        <button className="page-link" onClick={ () => { onParamChanged('page', value) } }>
                            { value }
                        </button>
                    </li>
                ));
            });

            // Next page
            if (showPageNext) {
                pager.push(this.getNextButton(totalPages));
            }
        }

        return (
            <ul className={ classNamePager }>
                {
                    pager.map((element) => {
                        return element;
                    })
                }
            </ul>
        );
    }

}

export default withOptions(Paginator);
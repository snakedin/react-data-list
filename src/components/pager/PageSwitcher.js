import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withOptions } from "../../options/withOptions";

class PageSwitcher extends Component {

    static propTypes = {
        page: PropTypes.number,
        lastPage: PropTypes.bool,
        onParamChanged: PropTypes.func
    };

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
                    <button className="page-link" tabIndex="-1">{ label }</button>
                </li>
            )
        } else {
            return (
                <li className="page-item" key="prev">
                    <button className="page-link" aria-label="Previous" onClick={ () => { onParamChanged('page', page-1) } }>{ label }</button>
                </li>
            );
        }
    };

    /**
     * Render next page button
     */
    getNextButton() {

        const { page, lastPage, onParamChanged } = this.props;
        const label = (
            <span aria-hidden="true">&raquo;</span>
        );

        if (lastPage === true) {
            return (
                <li className="page-item disabled" key="next">
                    <button className="page-link" tabIndex="-1">{ label }</button>
                </li>
            )
        } else {
            return (
                <li className="page-item" key="next">
                    <button className="page-link" aria-label="Next" onClick={ () => { onParamChanged('page', page+1) } }>{ label }</button>
                </li>
            );
        }
    };

    /**
     * Render element
     */
    render() {

        const { page, lastPage,  options: { classNamePager } } = this.props;

        if (page === 1 && lastPage === true) {
            return null;
        }

        return (
            <ul className={ classNamePager }>
                { this.getPreviousButton() }
                { this.getNextButton() }
            </ul>
        );
    }
}

export default withOptions(PageSwitcher);
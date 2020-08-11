import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withOptions } from "../options/withOptions";

class HeaderCell extends Component {

    static propTypes = {
        id: PropTypes.string,
        label: PropTypes.string,
        attributes: PropTypes.object,
        onChangeSort: PropTypes.func,
        currentSort: PropTypes.string
    };

    /**
     *  Parse column header label
     */
    parseLabel() {
        const { id, label } = this.props;

        if (label !== undefined && typeof label === "string") {
            return label;
        } else {
            return id.charAt(0).toUpperCase() + id.slice(1);
        }
    }

    /**
     * Render cell content
     */
    renderCell() {
        const { id, sort, onChangeSort, currentSort, options: { enableSorting } } = this.props;

        let content = this.parseLabel();

        if (sort !== false && enableSorting) {

            let sortBy = sort;
            let className = `btn btn-sm btn-link ${currentSort.charAt(0) === '-' ? 'desc' : 'asc'}`;

            if (sortBy === true || sortBy === undefined) {
                sortBy = id;
            }

            if ((currentSort.charAt(0) === '-' && currentSort.slice(1) === sortBy) || currentSort === sortBy) {
                className += ' active';
            }

            content = (
                <span onClick={ () => { onChangeSort(sortBy) } } className={className}>{ content }</span>
            )
        } else {
            content = <span className="btn btn-sm">{content}</span>;
        }

        return content;
    }

    render() {
        const { attributes } = this.props;

        return (
            <th scope="col" {...attributes}>
                { this.renderCell() }
            </th>
        );
    }
}

export default withOptions(HeaderCell);
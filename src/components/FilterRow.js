import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withOptions } from "../options/withOptions";
import FilterCell from "./FilterCell";

class FilterRow extends Component {

    static propTypes = {
        columns: PropTypes.arrayOf(
            PropTypes.element
        ),
        currentFilter: PropTypes.object,
        onChangeFilter: PropTypes.func
    };

    /**
     * Parse column props for filter params
     */
    prepareFilterParams(id, filter) {
        if (typeof filter === "boolean" && filter === true) {
            return {
                'type': 'text',
                'field': id,
            }
        } else if (typeof filter === "function") {
            return  {
                'type': 'custom',
                'field': id,
                'handler': filter
            }
        } else if (typeof filter === "object") {

            let { field, ...params } = filter;

            if (field === undefined) {
                field = id;
            }

            return {
                ...params,
                field: field
            }
        }

        return false;
    };

    /**
     * Render filter row
     */
    render() {

        const {
            columns, currentFilter, onChangeFilter,
            options: { showFilter }
        } = this.props;

        if (showFilter === false) {
            return null;
        }

        return (
            <tr>
                {
                    columns.map(({ props: { id, filter } }) => {
                        filter = this.prepareFilterParams(id, filter);

                        if (filter === false) {
                            return (
                                <td key={ id }> </td>
                            )
                        } else {
                            return (
                                <FilterCell
                                    key={ id }
                                    filter={ filter }
                                    value={ currentFilter[filter.field] }
                                    onChangeFilter={ onChangeFilter }
                                />
                            )
                        }
                    })
                }
            </tr>
        );
    }
}

export default withOptions(FilterRow);
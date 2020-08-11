import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withOptions } from "../options/withOptions";
import HeaderCell from "./HeaderCell";

class HeaderRow extends Component {

    static propTypes = {
        columns: PropTypes.arrayOf(
            PropTypes.element
        ),
        currentSort: PropTypes.string,
        onChangeSort: PropTypes.func
    };

    /**
     * Render header row
     */
    render() {

        const {
            columns, currentSort, onChangeSort,
            options: { classNameHead }
        } = this.props;

        return (
            <thead className={ classNameHead }>
                <tr>
                    {
                        columns.map((column) => {
                            const {id, label, sort, headerAttributes} = column.props;
                            return (
                                <HeaderCell
                                    key={ id }
                                    id={ id }
                                    label={ label }
                                    sort={ sort }
                                    attributes={ headerAttributes }
                                    onChangeSort={ onChangeSort }
                                    currentSort={ currentSort }
                                />
                            )
                        })
                    }
                </tr>
            </thead>
        );
    }
}

export default withOptions(HeaderRow);
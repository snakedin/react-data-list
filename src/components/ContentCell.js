import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ContentCell extends Component {

    static propTypes = {
        id: PropTypes.string,
        value: PropTypes.func,
        attributes: PropTypes.object
    };

    renderCell() {
        const { id, value, item } = this.props;

        if (value !== 'undefined' && typeof value === 'function') {
            return value(item);
        } else {
            return item[id] !== undefined ? item[id] : null;
        }
    }

    render() {

        const { attributes } = this.props;

        return (
            <td {...attributes}>
                { this.renderCell() }
            </td>
        );
    }
}
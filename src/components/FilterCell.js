import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DateField from "./filters/DateField";
import ReactSelectField from "./filters/ReactSelectField";
import SelectField from "./filters/SelectField";
import TextField from "./filters/TextField";

export default class FilterCell extends Component {

    static propTypes = {
        filter: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.object
        ]),
        value: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string,
            PropTypes.number,
            PropTypes.object,
            PropTypes.array
        ]),
        onChangeFilter: PropTypes.func
    };

    /**
     * Render filter field
     */
    renderField({ type, field, ...params }) {
        const { value, onChangeFilter } = this.props;

        if (type === 'custom') {
            const { handler } = params;
            return handler(field, value, onChangeFilter);
        } else {
            let Element;

            switch (type) {
                case 'select':
                    Element = SelectField;
                    break;

                case 'react-select':
                    Element = ReactSelectField;
                    break;

                case 'date':
                    Element = DateField;
                    break;

                case 'text':
                default:
                    Element = TextField
            }

            return <Element id={ field } value={ value } onChange={ onChangeFilter } { ...params }/>
        }
    }

    /**
     * Render cell content
     */
    render() {

        const { filter } = this.props;

        return  (
            <td>
                { this.renderField(filter) }
            </td>
        );
    }
}
import React, { Component } from 'react';
import PropTypes from "prop-types";

export default class SelectField extends Component {

    static propTypes = {
        id: PropTypes.string,
        value: PropTypes.string,
        items: PropTypes.arrayOf(
            PropTypes.object
        ),
        onChange: PropTypes.func
    };

    /**
     * Handle select change option
     */
    handleChange = (event) => {
        const { id, onChange } = this.props;
        const newValue = event.target.value === '' ? null : event.target.value;
        onChange(id, newValue);
    };

    /**
     * Render field
     */
    render() {
        const { value, items } = this.props;

        return (
            <select className="form-control" onChange={ this.handleChange } defaultValue={ value }>
                {
                    items.map(({value, label}) => {
                        return <option value={ value } key={ value }>{ label }</option>
                    })
                }
            </select>
        );
    }
}
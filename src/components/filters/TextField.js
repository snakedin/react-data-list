import React, { Component } from 'react';
import PropTypes from "prop-types";

export default class TextField extends Component {

    static propTypes = {
        id: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func
    };

    /**
     * Handle blur (instead of change)
     */
    handleBlur = (event) => {
        this.handleValueChanged(event.target.value);
    };

    /**
     * Handle enter key pressed
     */
    handleKeyUp = (event) => {
        if (event.keyCode === 13) {
            this.handleValueChanged(event.target.value);
        }
    };

    /**
     * Handle value's change
     */
    handleValueChanged = (newValue) => {
        const { id, onChange, value } = this.props;

        if (newValue === '') {
            newValue = null;
        }

        if (value !== newValue && !(value === undefined && newValue === null)) {
            onChange(id, newValue);
        }
    };

    /**
     * Render field
     */
    render() {
        const { value } = this.props;

        return (
            <input
                type="text"
                className="form-control"
                onBlur={ this.handleBlur }
                onKeyUp={ this.handleKeyUp }
                defaultValue={ value }
            />
        );
    }
}
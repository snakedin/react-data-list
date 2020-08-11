import React, { Component } from 'react';
import PropTypes from "prop-types";
import DatePicker from 'react-modern-calendar-datepicker';
import { withOptions } from "../../options/withOptions";

class DateField extends Component {

    static defaultProps = {
        formatInputText: (from, to) => {
            if (from !== null && to !== null) {
                return `${from.month}/${from.day}/${from.year} - ${to.month}/${to.day}/${to.year}`;
            }

            return  '';
        },
        inputPlaceholder: null,
        inputClassName: "form-control",
        resetButtonLabel: null
    };

    static propTypes = {
        id: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),
        onChange: PropTypes.func
    };

    state = {
        from: null,
        to: null,
    };

    componentDidMount() {
        this.updateValue();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.value !== prevProps.value) {
            this.updateValue();
        }
    }

    /**
     * Update date value
     */
    updateValue = () => {
        let { value } = this.props;

        if (typeof value !== 'object') {
            value = {
                from: null,
                to: null,
            };
        }

        this.setState(value);
    };

    /**
     * Handle select change option
     */
    handleChange = (value) => {
        const { id, onChange } = this.props;
        const { from, to } = value;

        this.setState({ from, to }, () => {
            if (from !== null && to !== null) {
                onChange(id, value);
            }
        });
    };

    /**
     * Reset selected value
     */
    resetValue = () => {
        this.setState({ from: null, to: null }, () => {
            const { id, onChange } = this.props;
            onChange(id, null);
        });
    };

    /**
     * Render field
     */
    render() {
        const { value, onChange, formatInputText, inputClassName, inputPlaceholder, resetButtonLabel, options, ...props } = this.props;
        const { from, to } = this.state;

        // Render HTML input element
        const renderCustomInput = ({ ref }) => (
            <input
                ref={ ref }
                placeholder={ options.phrase(inputPlaceholder, 'datePlaceholder') }
                defaultValue={ formatInputText(from, to) }
                className={ inputClassName }
            />
        );

        // Render footer with reset button
        let footer = () => {};

        if ( from !== null && to !== null ) {
            footer = () => (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '0 2rem 1rem 2rem' }}>
                    <button type="button" className="btn btn-primary" onClick={() => { this.resetValue() }} style={{ padding: "0.2rem 0.4rem", backgroundColor: "#007bff" }}>
                        { options.phrase(resetButtonLabel, 'dateResetValue') }
                    </button>
                </div>
            )
        }

        return (
            <DatePicker
                value={ {from, to} }
                onChange={ this.handleChange }
                renderInput={ renderCustomInput }
                renderFooter={ footer }
                { ...props }
            />
        );
    }
}

export default withOptions(DateField);
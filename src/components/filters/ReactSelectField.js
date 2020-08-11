import React, { Component } from 'react';
import PropTypes from "prop-types";
import Select from 'react-select';
import { withOptions } from "../../options/withOptions";

class ReactSelectField extends Component {

    static defaultProps = {
        isMulti: false
    };

    static propTypes = {
        id: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string,
            PropTypes.number,
            PropTypes.array
        ]),
        items: PropTypes.arrayOf(
            PropTypes.object
        ),
        isMulti: PropTypes.bool,
        onChange: PropTypes.func
    };

    /**
     * Handle select change option
     */
    handleChange = selected => {
        const { id, onChange } = this.props;

        if (selected === null) {
            onChange(id, null);
        } else {
            const { isMulti } = this.props;

            if (isMulti) {
                onChange(id, selected);
            } else {
                onChange(id, selected.value);
            }
        }
    };

    /**
     * Render field
     * @see https://github.com/JedWatson/react-select
     */
    render() {
        const { value, items, onChange, options, isMulti, ...props } = this.props;
        const selectValue = isMulti ? value : items.find(element => element.value === value);

        return (
            <Select
                value={ selectValue }
                onChange={ this.handleChange }
                options={ items }
                placeholder={ options.translate('selectPlaceholder') }
                isMulti={ isMulti }
                { ...props }
            />
        );
    }
}

export default withOptions(ReactSelectField);
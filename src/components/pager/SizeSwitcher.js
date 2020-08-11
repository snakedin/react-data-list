import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withOptions } from "../../options/withOptions";

class SizeSwitcher extends Component {

    static propTypes = {
        pageSize: PropTypes.number,
        onParamChanged: PropTypes.func
    };

    /**
     * Handle select change option
     */
    handleChange = (event) => {
        const { onParamChanged } = this.props;
        onParamChanged('pageSize', event.target.value);
    };

    render() {
        const { pageSize, options: { pageSizes } } = this.props;

        return (
            <select className="form-control" onChange={ this.handleChange } defaultValue={ pageSize }>
                {
                    pageSizes.map((value) => {
                        return <option value={ value } key={ value }>{ value }</option>
                    })
                }
            </select>
        );
    }
}

export default withOptions(SizeSwitcher);
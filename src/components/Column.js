import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Column extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
        value: PropTypes.func,
        sort: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string
        ]),
        filter: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.object,
            PropTypes.func
        ]),
        headerAttributes: PropTypes.object,
        contentAttributes: PropTypes.object,
    };

    static defaultProps = {
        sort: true,
        filter: true,
    };

    render() {
        return null;
    }
}
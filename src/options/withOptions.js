import React from 'react';
import { OptionsConsumer } from './OptionsContext';

export function withOptions(Component) {
    return (props) => {
        return (
            <OptionsConsumer>
                { options => <Component {...props} options={options} /> }
            </OptionsConsumer>
        );
    };
}

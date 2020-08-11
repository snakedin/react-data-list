import React, { Component } from 'react';

export default class ExamplePage extends Component {

    state = {
        showCode: false
    };

    showCode = ( value ) => {
        this.setState(() => {
            return {
                showCode: value
            }
        });
    };

    render() {

        const { example, code } = this.props;
        const { showCode } = this.state;

        const exampleClass = 'nav-link' + (showCode ? '' : ' active');
        const codeClass = 'nav-link' + (showCode ? ' active' : '');

        return (
            <div>
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                        <a className={ exampleClass } onClick={() => { this.showCode(false) }}>Example</a>
                    </li>
                    <li className="nav-item">
                        <a className={ codeClass } onClick={() => { this.showCode(true) }}>Source</a>
                    </li>
                </ul>

                <div className="tab-content">
                    <div className="tab-pane active" role="tabpanel">
                        <div className="mt-3">
                            { showCode ? code : example }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

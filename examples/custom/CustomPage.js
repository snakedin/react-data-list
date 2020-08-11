import React from 'react';
import ExamplePage from "../ExamplePage";
import CustomExample from "./CustomExample";
import CustomCode from "./CustomCode";

function CustomPage() {
    return (
        <div>
            <div className="alert alert-info" role="alert">
                To create your own filter field, pass a function as <code>filter</code> prop of the <code>Column</code> component. This function must return the custom component.
            </div>

            <ExamplePage example={<CustomExample/>} code={<CustomCode/>}/>
        </div>
    );
}

export default CustomPage;

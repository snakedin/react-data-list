import React from 'react';
import ExamplePage from "../ExamplePage";
import RouterExample from "./RouterExample";
import RouterCode from "./RouterCode";

function RouterPage() {
    return (
        <div>
            <div className="alert alert-info" role="alert">
                <ul className="mb-0 pl-3">
                    <li>The <code>ReactRouter</code> helper binds pagination, sorting, and filtering params to the browser's address bar. You can define these parameters in the address bar and they will be automatically set when the component is mounted. When the parameters change in the component itself, they also change in the address bar.</li>
                    <li>Stable version of <code><a href="https://reactrouter.com/web/guides/quick-start">react-router-dom</a></code> is required.</li>
                </ul>
            </div>

            <ExamplePage example={<RouterExample/>} code={<RouterCode/>}/>
        </div>
    )
}

export default RouterPage;

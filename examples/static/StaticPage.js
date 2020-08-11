import React from 'react';
import ExamplePage from "../ExamplePage";
import StaticExample from "./StaticExample";
import StaticCode from "./StaticCode";

function StaticPage() {
    return (
        <div>
            <div className="alert alert-info" role="alert">
                <ul className="mb-0 pl-3">
                    <li>The data source (provider) can be an array of objects, an async function, or an instance of the special FetchProvider helper class.</li>
                    <li>In this basic example, a static array of objects is used as a provider.</li>
                </ul>
            </div>

            <ExamplePage example={<StaticExample/>} code={<StaticCode/>}/>
        </div>
    );
}

export default StaticPage;
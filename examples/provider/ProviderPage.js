import React from 'react';
import ExamplePage from "../ExamplePage";
import ProviderExample from "./ProviderExample";
import ProviderCode from "./ProviderCode";

function ProviderPage() {
    return (
        <div>
            <div className="alert alert-info" role="alert">
                <ul className="mb-0 pl-3">
                    <li>The <code>FetchProvider</code> helper is designed to ease the process of creating data providers. The user sets the basic options (url, credentials, headers), and the helper automatically generates a request, executes it and returns the result.</li>
                    <li>By default, <code>FetchProvider</code> sends sorting, paging and filter values as GET-parameters. To change the names of parameters or send them in another way (for example, in the request body), you need to override the methods <code>prepareUrlParams(query, pager, filter)</code> and <code>prepareBodyParams(pager, filter)</code></li>
                    <li>The <code>handleSuccess</code> method is responsible for processing the received query results. Override it if you want to change the resulting response structure.</li>
                </ul>
            </div>

            <ExamplePage example={<ProviderExample/>} code={<ProviderCode/>}/>
        </div>
    );
}

export default ProviderPage;

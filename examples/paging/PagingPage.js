import React from 'react';
import ExamplePage from "../ExamplePage";
import PagingExample from "./PagingExample";
import PagingCode from "./PagingCode";

function PagingPage() {
    return (
        <div>
            <div className="alert alert-info" role="alert">
                <ul className="mb-0 pl-3">
                    <li>An async function can be used as a data provider to interact with the remote API. It must return an object with items field: <code>&#123; items: [...] &#125;</code></li>
                    <li>For paging to work, the provider function must additionally return either the <code>count</code> field (full pagination) or the <code>isLast</code> field (next / previous page switch).</li>
                    <li>Sorting usage, displaying the pagebar or its parts are fully configured by the props of the component.</li>
                    <li> Test data for these examples provided by <a href="https://rawg.io/apidocs" target="_blank">RAWG Database API</a></li>
                </ul>
            </div>

            <ExamplePage example={<PagingExample/>} code={<PagingCode/>}/>
        </div>
    );
}

export default PagingPage;

import React from 'react';
import ExamplePage from "../ExamplePage";
import DemoExample from "./DemoExample";
import DemoCode from "./DemoCode";

function DemoPage() {
    return (
        <div>
            <div className="jumbotron" style={{padding: '1rem'}}>
                <p className="lead" style={{marginBottom: '0'}}>
                    <b>React DataList</b> is a lightweight, fast and fully customized component for creating data tables with sorting, filtering and paging support. An excellent choice for the admin centers or the control panels.
                </p>
            </div>

            <ExamplePage example={<DemoExample/>} code={<DemoCode/>}/>
        </div>
    );
}

export default DemoPage;

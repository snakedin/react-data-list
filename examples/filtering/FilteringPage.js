import React from 'react';
import ExamplePage from "../ExamplePage";
import FilteringExample from "./FilteringExample";
import FilteringCode from "./FilteringCode";

function FilteringPage() {
    return (
        <div>
            <div className="alert alert-info" role="alert">
                <ul className="mb-0 pl-3">
                    <li>The filter type and parameters are set in the <code>filter</code> property of the <code>Column</code> component. When the request is preparing, the data provider receives the current filtering values and must pass them to the API.</li>
                    <li>By default, <code>DataList</code> supports the following filter types: <code>text</code>, <code>select</code>, <code><a href="https://github.com/JedWatson/react-select">react-select</a></code>, and <code><a href="https://github.com/Kiarash-Z/react-modern-calendar-datepicker">date</a></code>. You can also create your own filter fields (see <a href="/custom">example</a> below).</li>
                </ul>
            </div>

            <ExamplePage example={<FilteringExample/>} code={<FilteringCode/>}/>
        </div>
    );
}

export default FilteringPage;

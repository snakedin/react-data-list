import React from "react";
import { render } from "@testing-library/react";
import FilterCell from "../../src/components/FilterCell";

it("FilterCell render", () => {

    function tdRender(component) {
        const tableRow = document.createElement('tr');

        const { container } = render(component, {
            container: document.body.appendChild(tableRow)
        });

        return container;
    }

    const textField = tdRender(<FilterCell filter={{type: 'text', field: 'name'}}/>);
    expect(textField).toMatchSnapshot();

    const selectFilter = {
        type: 'select',
        field: 'name',
        items: [
            {value: 1, label: 'Item 1'},
            {value: 2, label: 'Item 2'},
            {value: 3, label: 'Item 3'}
        ]
    };
    const selectField = tdRender(<FilterCell value={'2'} filter={selectFilter}/>);
    expect(selectField).toMatchSnapshot();
});
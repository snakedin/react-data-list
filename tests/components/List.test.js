import React from "react";
import { render } from "@testing-library/react";
import DataList, { Column } from "../../src/index";

it("DataList render", () => {

    const provider = [];
    let result;

    result = render(
        <DataList/>
    );
    expect(result.asFragment()).toMatchSnapshot('#1 error on component without any props');

    result = render(
        <DataList provider={ provider }/>
    );
    expect(result.asFragment()).toMatchSnapshot('#2 error on empty columns');

    result = render(
        <DataList>
            <Column id="id"/>
        </DataList>
    );
    expect(result.asFragment()).toMatchSnapshot('#3 error on empty provider');

    result = render(
        <DataList provider={ provider }>
            <Column id="id" />
        </DataList>
    );
    expect(result.asFragment()).toMatchSnapshot('#4 all default props');

    result = render(
        <DataList provider={ provider } enableSorting={ false } showFilter={ false }>
            <Column id="id" />
        </DataList>
    );
    expect(result.asFragment()).toMatchSnapshot('#5 without sorting and filtering');
});

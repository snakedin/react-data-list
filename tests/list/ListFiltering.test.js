import React from "react";
import { render, screen, waitForElementToBeRemoved, fireEvent } from "@testing-library/react";
import DataList, { Column } from "../../src/index";
import provider from "../mocks/providerMock";

it("DataList sorting", async () => {

    const { container } = render(
        <DataList provider={provider}>
            <Column id="id" label="ID"/>
            <Column id="name" />
            <Column id="year"/>
            <Column
                id="seasons"
                sort={false}
                filter={{
                    type: 'select',
                    items: [{ value: '', label: "" }, { value: 1, label: 1 }, { value: 2, label: 2}, { value: 5, label: 5 }]
                }}
            />
            <Column id="episodes" filter={false}/>
        </DataList>
    );

    // Default state
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    await waitForElementToBeRemoved(screen.getByRole("progressbar")).then(() => expect(container).toMatchSnapshot('1 without filters'));

    // Apply filter by ID
    fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: '18' }});
    fireEvent.blur(screen.getAllByRole('textbox')[0]);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    await waitForElementToBeRemoved(screen.getByRole("progressbar")).then(() => expect(container).toMatchSnapshot('2 set filter by ID'));

    // Apply filter by seasons count
    fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: '' }});
    fireEvent.blur(screen.getAllByRole('textbox')[0]);

    await waitForElementToBeRemoved(screen.getByRole("progressbar"));
    fireEvent.change(screen.getAllByRole('combobox')[0], { target: { value: '5'}});

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    await waitForElementToBeRemoved(screen.getByRole("progressbar")).then(() => expect(container).toMatchSnapshot('3 set filter by seasons'));
});

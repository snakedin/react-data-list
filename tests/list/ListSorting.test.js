import React from "react";
import { render, screen, waitFor, waitForElementToBeRemoved, fireEvent } from "@testing-library/react";
import DataList, { Column } from "../../src/index";
import provider from "../mocks/providerMock";

it("DataList sorting", async () => {

    const { container } = render(
        <DataList provider={provider} showFilter={false}>
            <Column id="id" label="ID" />
            <Column id="name" />
            <Column id="year" />
            <Column id="seasons" sort={false}/>
            <Column id="episodes" />
        </DataList>
    );

    // Default sort
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    await waitForElementToBeRemoved(screen.getByRole("progressbar")).then(() => expect(container).toMatchSnapshot('1 default sorting'));

    // Sort by name asc
    fireEvent.click(screen.getByText('Name'));

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    await waitForElementToBeRemoved(screen.getByRole("progressbar")).then(() => expect(container).toMatchSnapshot('2 sort by name asc'));

    // Sort by name desc
    fireEvent.click(screen.getByText('Name'));

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    await waitForElementToBeRemoved(screen.getByRole("progressbar")).then(() => expect(container).toMatchSnapshot('3 sort by name desc'));

    // Sort by year
    fireEvent.click(screen.getByText('Year'));

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    await waitForElementToBeRemoved(screen.getByRole("progressbar")).then(() => expect(container).toMatchSnapshot('4 sort by year'));

    // Click on the column with disabled sorting
    fireEvent.click(screen.getByText('Seasons'));

    await waitFor(() => expect(container).toMatchSnapshot('5 click on the column with disabled sorting'));
});

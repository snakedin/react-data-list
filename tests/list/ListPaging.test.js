import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import DataList, { Column } from "../../src/index";
import provider from "../mocks/providerMock";

it("DataList paging", async () => {

    render(
        <DataList provider={provider} showFilter={false}>
            <Column id="id" label="ID" />
            <Column id="name" />
            <Column id="year" />
            <Column id="seasons" />
            <Column id="episodes" />
        </DataList>
    );

    // First page
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText("Teenage Mutant Ninja Turtles")).toBeInTheDocument());

    // Second page
    fireEvent.click(screen.getByText('2', { ignore: 'td'}));

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText("Dino-Riders")).toBeInTheDocument());

    // Last page
    fireEvent.click(screen.getByText('3', { ignore: 'td'}));

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText("Are You Afraid of the Dark?")).toBeInTheDocument());

    // @todo try to change page size
});

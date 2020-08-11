import React from 'react';
import OptionsService from "../../src/options/OptionsService";

const mockService = new OptionsService({
    classNamePager: 'pagination mb-0 justify-content-center justify-content-lg-start',
    enableSorting: true,
    pageSizes: [10, 20, 30],
    pageShowMax: 10,
    showFilter: true,
    showPageBar: true,
    showPageNext: true,
    showPagePrevious: true,
    renderPageBar: null,
    renderPageSummary: null
});

jest.mock("../../src/options/withOptions", () => {
    return {
        withOptions: (Component) => {
            return (props) => {
                return <Component {...props} options={mockService} />;
            };
        },
    };
});

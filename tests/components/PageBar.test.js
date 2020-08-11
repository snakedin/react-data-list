import React from "react";
import { render } from "@testing-library/react";
import "../mocks/withOptionsMock";
import PageBar from "../../src/components/PageBar";

it("PageBar render", () => {

  const { asFragment, rerender } = render(<PageBar page={25} lastPage={false}/>);
  expect(asFragment()).toMatchSnapshot('short prev/next page switcher');

  rerender(<PageBar page={13} pageSize={10} totalCount={500}/>);
  expect(asFragment()).toMatchSnapshot('full pagination');
});

import React from "react";
import { render } from "@testing-library/react";
import "../../mocks/withOptionsMock";
import SizeSwitcher from "../../../src/components/pager/SizeSwitcher";

it("pager/SizeSwitcher render", () => {
  const { rerender, asFragment } = render(<SizeSwitcher pageSize={10}/>);
  expect(asFragment()).toMatchSnapshot();
});

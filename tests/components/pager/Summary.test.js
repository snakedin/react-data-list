import React from "react";
import { render } from "@testing-library/react";
import "../../mocks/withOptionsMock";
import Summary from "../../../src/components/pager/Summary";

it("pager/Summary render", () => {
  const { asFragment } = render(<Summary page={3} pageSize={15} totalCount={100} />);
  expect(asFragment()).toMatchSnapshot();
});

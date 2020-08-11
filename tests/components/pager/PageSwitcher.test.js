import React from "react";
import { render } from "@testing-library/react";
import "../../mocks/withOptionsMock";
import PageSwitcher from "../../../src/components/pager/PageSwitcher";

it("pager/PageSwitcher render", () => {
  const { rerender, asFragment } = render(<PageSwitcher page={1} lastPage={false} />);
  expect(asFragment()).toMatchSnapshot();

  rerender(<PageSwitcher page={2} lastPage={false} />);
  expect(asFragment()).toMatchSnapshot();

  rerender(<PageSwitcher page={3} lastPage={true} />);
  expect(asFragment()).toMatchSnapshot();
});

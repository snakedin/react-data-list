import React from "react";
import { render } from "@testing-library/react";
import "../../mocks/withOptionsMock";
import Paginator from "../../../src/components/pager/Paginator";

it("pager/Paginator render", () => {
  const { asFragment, rerender } = render(<Paginator page={1} pageSize={10} totalCount={100}/>);
  const firstPage = asFragment();

  rerender(<Paginator page={5} pageSize={10} totalCount={100}/>);
  const middlePage = asFragment();

  rerender(<Paginator page={10} pageSize={10} totalCount={100}/>);
  const lastPage = asFragment();

  expect(firstPage).toMatchSnapshot();
  expect(firstPage).toMatchDiffSnapshot(middlePage);
  expect(middlePage).toMatchDiffSnapshot(lastPage);
});

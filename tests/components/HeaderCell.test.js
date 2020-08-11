import React from "react";
import { render } from "@testing-library/react";
import "../mocks/withOptionsMock";
import HeaderCell from "../../src/components/HeaderCell";

it("HeaderCell render", () => {

  function thRender(component) {
    const tableRow = document.createElement('tr');

    const { container } = render(component, {
      container: document.body.appendChild(tableRow)
    });

    return container;
  }

  const baseRender = thRender(<HeaderCell id="name" currentSort={''}/>);
  expect(baseRender).toMatchSnapshot();

  expect(baseRender).toMatchDiffSnapshot(
      thRender(<HeaderCell id="name" attributes={{'className': 'header-cell'}} currentSort={''}/>)
  );

  expect(baseRender).toMatchDiffSnapshot(
      thRender(<HeaderCell id="name" label="User Name" currentSort={''}/>)
  );

  expect(baseRender).toMatchDiffSnapshot(
      thRender(<HeaderCell id="name" sort={false} currentSort={''}/>)
  );

  expect(baseRender).toMatchDiffSnapshot(
      thRender(<HeaderCell id="name" sort={true} currentSort={"name"}/>)
  );

  expect(baseRender).toMatchDiffSnapshot(
      thRender(<HeaderCell id="name" sort={true} currentSort={"-name"}/>)
  );

  expect(baseRender).toMatchDiffSnapshot(
      thRender(<HeaderCell id="name" sort={"userName"} currentSort={"userName"}/>)
  );
});

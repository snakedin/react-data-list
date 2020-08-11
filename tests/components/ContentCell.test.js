import React from "react";
import { render } from "@testing-library/react";
import ContentCell from "../../src/components/ContentCell";

it("ContentCell render", () => {

  function tdRender(component) {
    const tableRow = document.createElement('tr');

    const { container } = render(component, {
      container: document.body.appendChild(tableRow)
    });

    return container;
  }

  const item = { id: 11, name: "Test Value" };

  const baseRender = tdRender(<ContentCell item={item} id={'name'}/>);
  expect(baseRender).toMatchSnapshot();

  expect(baseRender).toMatchDiffSnapshot(
      tdRender(<ContentCell item={item} id={'none'}/>)
  );

  expect(baseRender).toMatchDiffSnapshot(
      tdRender(<ContentCell item={item} id={'name'} attributes={{'className': 'content-cell'}}/>)
  );

  expect(baseRender).toMatchDiffSnapshot(
      tdRender(<ContentCell item={item} value={(item) => <span>{item.id}: {item.name}</span>}/>)
  );
});

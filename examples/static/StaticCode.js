import React from 'react';
import CodeWrapper from "../CodeWrapper";

function StaticCode() {

    const codeString = `import React from 'react';
import DataList, { Column } from 'react-data-list';

function StaticExample() {
    return (
        <DataList provider={ data } showFilter={ false } enableSorting={ false }>
            <Column id="id" label="ID"/>
            <Column id="name" label="Company"/>
            <Column id="founded"/>
            <Column id="founder"/>
        </DataList>
    );
}

const data = [
    {id: 1, name: "Bösendorfer", founded: 1828, founder: "Ignaz Bösendorfer"},
    {id: 2, name: "Blüthner", founded: 1853, founder: "Julius Blüthner"},
    {id: 3, name: "Steinway & Sons", founded: 1853, founder: "Heinrich Steinweg"},
    {id: 4, name: "C. Bechstein", founded: 1853, founder: "Carl Bechstein"},
    {id: 5, name: "Fazioli", founded: 1981, founder: "Paolo Fazioli"},
    {id: 6, name: "Shigeru Kawai", founded: 1927, founder: "Koichi Kawai"},
    {id: 7, name: "Mason and Hamlin", founded: 1854, founder: "Henry Mason"},
    {id: 8, name: "Stuart and Sons", founded: 1990, founder: "Wayne Stuart"},
    {id: 9, name: "Schimmel", founded: 1885, founder: "Wilhelm Schimmel"},
    {id: 10, name: "Grotrian", founded: 1835, founder: "Heinrich Steinweg"},
];

export default StaticExample;`;

    return (
        <CodeWrapper code={codeString} />
    );
}

export default StaticCode;

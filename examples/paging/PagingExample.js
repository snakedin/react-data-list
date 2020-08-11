import React from 'react';
import DataList, { Column } from '../../src/index';

function PagingExample() {
    return (
        <DataList provider={ provider } showFilter={ false }>
            <Column id="id" label="ID" />
            <Column id="name" />
            <Column id="slug" />
            <Column id="games_count" label="Total games" />
        </DataList>
    );
}

const provider = async (pager) => {

    const res = await fetch(`https://api.rawg.io/api/platforms?page=${pager.page}&page_size=${pager.pageSize}&ordering=${pager.sortBy}`);

    if (!res.ok) {
        throw new Error(`Could not fetch, received ${res.status}`);
    }

    const response = await res.json();

    return  {
        items: response.results.map(function(item) {
            return ['id', 'name', 'slug', 'games_count']
                .reduce((obj, key) => ({ ...obj, [key]: item[key] }), {});
        }),
        count: response.count,
        pager
    }
};

export default PagingExample;

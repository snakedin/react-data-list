import React from 'react';
import DataList, {Column, FetchProvider} from '../../src/index';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';

function FilteringExample() {
    return (
        <DataList provider={ provider.get }>
            <Column
                id="id"
                label="ID"
                sort={ false }
                filter={{
                    type: 'text',
                    field: 'ids'
                }}
            />

            <Column
                id="name"
                filter={{
                    type: 'text',
                    field: 'search'
                }}
            />

            <Column
                id="genre"
                label="Genres"
                sort={ false }
                filter={{
                    type: 'select',
                    field: 'genres',
                    items: genres
                }}
                value={ (item) => {
                    return item.genres.map(({ id, name }) => {
                        return <span key={id}>{ name }<br/></span>;
                    });
                } }
            />

            <Column
                id="platform"
                label="Platforms"
                sort={ false }
                filter={{
                    type: 'react-select',
                    field: 'platforms',
                    items: platforms,
                    isClearable: true
                }}
                value={ (item) => {
                    return item.platforms.slice(-4).map(({ platform: { id, name } }) => {
                        return <span key={id}>{ name }<br/></span>;
                    });
                } }
                contentAttributes={{
                    'className': 'col-md-2',
                }}
            />

            <Column
                id="tag"
                label="Tags"
                sort={ false }
                filter={{
                    type: 'react-select',
                    field: 'tags',
                    items: tags,
                    isMulti: true,
                    isClearable: true
                }}
                value={ (item) => {
                    return item.tags.slice(-4).map(({ id, name }) => {
                        return <span key={id}>{ name }<br/></span>;
                    });
                } }
                contentAttributes={{
                    'className': 'col-md-3',
                }}
            />

            <Column
                id="date_released"
                label="Released"
                sort="released"
                filter={{
                    type: 'date'
                }}
                value={ (item) => {
                    return item.released
                } }
            />
        </DataList>
    );
}

// Data provider
const provider = new FetchProvider({
    url: 'https://api.rawg.io/api/games',
    prepareUrlParams: (query, pager, { date_released, ...autoFilter }) => {
        query.append('page', pager.page);
        query.append('page_size', pager.pageSize);
        query.append('ordering', pager.sortBy);

        if (date_released !== undefined && typeof date_released === 'object') {
            const { from, to } = date_released;
            const fromDate = new Date(`${from.year}-${from.month}-${from.day}`);
            const toDate = new Date(`${to.year}-${to.month}-${to.day}`);

            query.append('dates', fromDate.toISOString().slice(0, 10) + ',' + toDate.toISOString().slice(0, 10));
        }

        Object.entries(autoFilter).forEach(([key, value]) => {
            if (value !== undefined && value !== '') {
                if (Array.isArray(value) && value.length > 0) {
                    query.append(key, value.map(elem => elem.value).join(','));
                } else {
                    query.append(key, value);
                }
            }
        });

        return query;
    },
    handleSuccess: (response) => {
        return {
            items: response.results.map(function(item) {
                return ['id', 'name', 'genres', 'platforms', 'tags', 'released']
                    .reduce((obj, key) => ({ ...obj, [key]: item[key] }), {});
            }),
            count: response.count
        }
    }
});

// Filters values
const genres = [
    { value: '', label: "" },
    { value: 4, label: "Action" },
    { value: 3, label: "Adventure" },
    { value: 5, label: "RPG" },
    { value: 2, label: "Shooter" },
    { value: 10, label: "Strategy" },
    { value: 14, label: "Simulation" },
    { value: 59, label: "Massively Multiplayer" }
];

const platforms = [
    { value: 4, label: "PC" },
    { value: 18, label: "PlayStation 4" },
    { value: 1, label: "Xbox One" },
    { value: 7, label: "Nintendo Switch" },
    { value: 3, label: "iOS" },
    { value: 21, label: "Android" }
];

const tags = [
    { value: 24, label: "RPG" },
    { value: 43, label: "Post-apocalyptic" },
    { value: 36, label: "Open World" },
    { value: 97, label: "Action RPG" },
    { value: 32, label: "Sci-fi" },
    { value: 63, label: "Zombies" },
    { value: 102, label: "Turn-Based" },
    { value: 317, label: "Time Travel" },
    { value: 208, label: "Alternate History" },
    { value: 180, label: "Base Building" }
];

export default FilteringExample;

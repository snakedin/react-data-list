import React from 'react';
import CodeWrapper from "../CodeWrapper";

function DemoCode() {

    const codeString = `import React from 'react';
import DataList, { Column, FetchProvider } from '@snakedin/react-data-list';

function DemoExample() {
    return (
        <DataList provider={ provider.get }>
            <Column id="id" label="ID" sort={ false } filter={ false }/>

            <Column
                id="image"
                value={ (item) => {
                    return item.background_image ? <img src={item.background_image} alt={item.name} style={{maxWidth: '150px'}}/> : ''
                }}
                sort={ false }
                filter={ false }
                contentAttributes={{
                    'className': 'text-center',
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
                    items: [
                        { value: '', label: "" },
                        { value: 4, label: "Action" },
                        { value: 3, label: "Adventure" },
                        { value: 5, label: "RPG" },
                        { value: 2, label: "Shooter" },
                        { value: 10, label: "Strategy" },
                        { value: 14, label: "Simulation" },
                        { value: 59, label: "Massively Multiplayer" }
                    ]
                }}
                value={ (item) => {
                    return item.genres.map(({ id, name }) => {
                        return <span key={id}>{ name }<br/></span>;
                    });
                } }
            />

            <Column
                id="tag"
                label="Tags"
                sort={ false }
                filter={{
                    type: 'react-select',
                    field: 'tags',
                    items: [
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
                    ],
                    isClearable: true
                }}
                value={ (item) => {
                    return item.tags.slice(-4).map(({ id, name }) => {
                        return <span key={id}>{ name }<br/></span>;
                    });
                } }
                contentAttributes={{
                    'className': 'col-md-2',
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

            <Column
                id="edit"
                label=""
                filter={false}
                value={ (item) => <a href={\`edit/\${item.id}\`}><i className="fas fa-pencil-alt"/></a> }
                contentAttributes={{ 'className': 'text-center' }}
            />

            <Column
                id="delete"
                label=""
                filter={false}
                value={ (item) => <a href={\`delete/\${item.id}\`}><i className="fas fa-trash-alt"/></a> }
                contentAttributes={{ 'className': 'text-center' }}
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

        Object.entries(autoFilter).forEach(([key, value]) => {
            if (value !== undefined && value !== '') {
                query.append(key, value);
            }
        });

        if (date_released !== undefined && typeof date_released === 'object') {
            const { from, to } = date_released;
            const fromDate = new Date(\`\${from.year}-\${from.month}-\${from.day}\`);
            const toDate = new Date(\`\${to.year}-\${to.month}-\${to.day}\`);

            query.append('dates', fromDate.toISOString().slice(0, 10) + ',' + toDate.toISOString().slice(0, 10));
        }

        return query;
    },
    handleSuccess: (response) => {
        return {
            items: response.results.map(function(item) {
                return ['id', 'name', 'background_image', 'genres', 'tags', 'released']
                    .reduce((obj, key) => ({ ...obj, [key]: item[key] }), {});
            }),
            count: response.count
        }
    }
});

export default DemoExample;`;

    return (
        <CodeWrapper code={codeString} />
    );
}

export default DemoCode;

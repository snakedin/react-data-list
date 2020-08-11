import React from 'react';
import { RouterDataList as DataList, FetchProvider, Column } from '../../src/index';

function RouterExample() {
    return (
        <DataList provider={ provider.get } pageSizes={ [5, 10, 20] }>
            <Column id="id" label="ID"/>

            <Column
                id="poster"
                value={ ({ posterImage, canonicalTitle: title }) => {
                    return posterImage ? <img src={ posterImage.tiny } alt={ title } /> : ''
                }}
                sort={ false }
                filter={ false }
                contentAttributes={{
                    'className': 'text-center',
                }}
            />

            <Column
                id="cannonicalTitle"
                label="Name"
                filter = {{
                    type: 'text',
                    field: 'text'
                }}
                sort = "slug"
                value={ ({canonicalTitle: title, synopsis}) => {
                    return (
                        <div>
                            <p><b>{ title }</b></p>
                            <p>{ synopsis.slice(0, 300) }...</p>
                        </div>
                    )
                }}
            />

            <Column
                id="categories"
                label="Categories"
                filter={{
                    type: 'react-select',
                    items: [
                        { value: 'comedy', label: "Comedy" },
                        { value: 'action', label: "Action" },
                        { value: 'drama', label: "Drama" },
                        { value: 'detective', label: "Detective" },
                        { value: 'fantasy', label: "Fantasy" }
                    ],
                    isClearable: true,
                    placeholder: ''
                }}
                sort={ false }
                value={ (item) => {
                    return item.categories.slice(-5).map(({ id, title }) => {
                        return <span key={id}>{ title }<br/></span>;
                    });
                } }
                contentAttributes={{
                    'className': 'col-md-2',
                }}
            />

            <Column
                id="ageRating"
                label="Age"
                filter={{
                    type: 'select',
                    items: [
                        { value: '', label: "" },
                        { value: 'G', label: "G" },
                        { value: 'PG', label: "PG" },
                        { value: 'R', label: "R" },
                        { value: 'R18', label: "R18" }
                    ]
                }}
            />

            <Column id="averageRating" label="Rating" filter={ true } />

            <Column id="startDate" label="Started" filter={ false } />
        </DataList>
    );
}

const provider = new FetchProvider({
    url: 'https://kitsu.io/api/edge/anime?include=categories&showType=TV',
    prepareUrlParams: (query, pager, filter) => {
        query.append('page[limit]', pager.pageSize);
        query.append('page[offset]', (pager.page-1)*pager.pageSize);
        query.append('sort', pager.sortBy);

        Object.entries(filter).forEach(([key, value]) => {
            query.append(`filter[${key}]`, value);
        });

        return query;
    },
    handleSuccess: (response) => {
        return {
            items: response.data.map(({id, attributes, relationships: { categories }}) => {
                return {
                    id,
                    ...attributes,
                    categories: categories.data.map(({ id: categoryId }) => {
                        return response.included
                            .filter((item) => {
                                return item.id === categoryId && item.type === "categories";
                            })
                            .map(({id, attributes: { slug, title }}) => {
                                return { id, slug, title };
                            })
                    }).flat()
                }
            }),
            count: response.meta.count
        }
    }
});

export default RouterExample;

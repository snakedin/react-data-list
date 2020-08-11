import React, { Component } from 'react';
import DataList, {Column, FetchProvider} from "../../src";

class CustomFilter extends Component {

    handleValueChanged = () => {
        const { id, onChange, value } = this.props;
        onChange(id, !value);
    };

    render() {
        const { value } = this.props;

        return (
            <div className="custom-control custom-switch mt-2">
                <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customFilter"
                    onChange={ this.handleValueChanged }
                    checked={ value }
                />
                <label className="custom-control-label" htmlFor="customFilter">{ value ? 'Only MMO' : 'Any' }</label>
            </div>
        );
    }
}

function CustomExample() {
    return (
        <DataList provider={ provider.get } pageSizes={ [5, 10, 20] }>
            <Column id="id" label="ID" sort={false} filter={{ field: 'ids' }}/>
            <Column id="name" filter={{ field: 'search' }} />
            <Column id="reviews_count" label="Reviews" sort={false} filter={false} value={ item => item.reviews_count }/>
            <Column
                id="isMMO"
                label="Is MMO"
                value={ (item) => item.genres.find(el => el.id === 59) ? 'Yes' : 'No' }
                sort={false}
                filter={(id, value, onChange) => {
                    return <CustomFilter id={id} value={value} onChange={onChange}/>
                }}
            />
        </DataList>
    );
}

const provider = new FetchProvider({
    url: 'https://api.rawg.io/api/games',
    prepareUrlParams: (query, pager, { isMMO = false, ...autoFilter }) => {
        query.append('page', pager.page);
        query.append('page_size', pager.pageSize);
        query.append('ordering', pager.sortBy);

        if (isMMO) {
            query.append('genres', 59);
        }

        Object.entries(autoFilter).forEach(([key, value]) => {
            query.append(key, value);
        });

        return query;
    },
    handleSuccess: (response) => {
        return {
            items: response.results.map(function(item) {
                return ['id', 'name', 'genres', 'reviews_count']
                    .reduce((obj, key) => ({ ...obj, [key]: item[key] }), {});
            }),
            count: response.count
        }
    }
});

export default CustomExample;

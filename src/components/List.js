import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeaderRow from "./HeaderRow";
import FilterRow from "./FilterRow";
import ContentCell from "./ContentCell";
import PageBar from "./PageBar";
import { OptionsProvider } from "../options/OptionsContext";
import OptionsService from "../options/OptionsService";

export default class List extends Component {

    static defaultProps = {
        classNameHead: 'thead-light',
        classNamePager: 'pagination mb-0 justify-content-center justify-content-lg-start',
        classNameRow: '',
        classNameTable: 'table table-striped table-hover table-bordered',
        defaultFilter: {},
        defaultPager: {
            page: 1,
            pageSize: 10,
            sortBy: '',
        },
        enableSorting: true,
        locale: {},
        pageSizes: [10, 20, 30],
        pageShowMax: 10,
        showFilter: true,
        showPageBar: true,
        showPageNext: true,
        showPagePrevious: true,
        extractId: (item) => item.id,
        onError: null,
        onParamsChanged: null,
        renderError: (errorText) => {
            return (
                <div>
                    <h1>Error </h1>
                    <p>{errorText}</p>
                </div>
            )
        },
        renderLoading: () => {
            return (
                <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}> </div>
                </div>
            )
        },
        renderPageBar: null,
        renderPageSummary: null,
        renderTemplate: (table, pageBar) => {
            return (
                <div>
                    { table }
                    { pageBar }
                </div>
            );
        }
    };

    static propTypes = {
        classNameHead: PropTypes.string,
        classNamePager: PropTypes.string,
        classNameRow: PropTypes.string,
        classNameTable: PropTypes.string,
        defaultFilter: PropTypes.object,
        defaultPager: PropTypes.shape({
            page: PropTypes.number,
            pageSize: PropTypes.number,
            sortBy: PropTypes.string,
        }),
        enableSorting: PropTypes.bool,
        locale: PropTypes.object,
        pageSizes: PropTypes.array,
        pageShowMax: PropTypes.number,
        showFilter: PropTypes.bool,
        showPageBar: PropTypes.bool,
        showPageNext: PropTypes.bool,
        showPagePrevious: PropTypes.bool,
        extractId: PropTypes.func,
        onError: PropTypes.func,
        onParamsChanged: PropTypes.func,
        renderError: PropTypes.func,
        renderLoading: PropTypes.func,
        renderPageBar: PropTypes.func,
        renderPageSummary: PropTypes.func,
        renderTemplate: PropTypes.func,
        provider: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.func
        ]),
        children: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.arrayOf(PropTypes.element)
        ]),
    };

    state = {
        data: [],
        count: 0,
        lastPage: null,
        filter: {},
        pager: {},
        loading: true,
        error: false
    };

    constructor(props) {
        super(props);
        this.options = new OptionsService(this.props);

        // Default state
        const { defaultFilter, defaultPager } = this.props;
        this.state.filter = defaultFilter;
        this.state.pager = defaultPager;
    }

    componentDidMount() {
        this.loadData()
    }

    /**
     * Change pager param handler
     */
    changePagerParam = (paramName, paramValue) => {
        this.setState(({ pager }) => {
            return {
                pager: {
                    ...pager,
                    [paramName]: paramValue
                },
                loading: true,
                error: false
            }
        }, () => {
            this.raiseParamsChanged();
        });
    };

    /**
     * Change sort ordering handler
     */
    changeSort = (newSort) => {
        const { sortBy } = this.state.pager;
        let currentSort = sortBy;

        if (currentSort.charAt(0) === '-') {
            currentSort = sortBy.slice(1);
        }

        if (currentSort === newSort && sortBy.charAt(0) !== '-') {
            newSort = '-' + newSort;
        }

        this.changePagerParam('sortBy', newSort);
    };

    /**
     * Change filter value handler
     */
    changeFilter = (field, value) => {
        this.setState( ({ filter }) => {
            let newFilter = { ...filter };

            if (value === null) {
                delete newFilter[field];
            } else {
                newFilter[field] = value;
            }

            return {
                filter: newFilter,
                loading: true,
                error: false
            }
        }, () => {
            this.raiseParamsChanged();
        });
    };

    /**
     * Raise params change event
     */
    raiseParamsChanged = () => {

        const { onParamsChanged } = this.props;

        if (typeof onParamsChanged === 'function') {
            const { pager, filter } = this.state;
            onParamsChanged(pager, filter);
        } else {
            this.loadData();
        }
    };

    /**
     * Load data through provider from source
     */
    loadData() {

        const { provider } = this.props;
        const { pager, filter } = this.state;

        if (typeof provider === "function") {
            provider(pager, filter)
                .then((data) => {
                    if (data.items === undefined || !Array.isArray(data.items)) {
                        this.setError('Field `items` was not found in provider response');
                    } else {
                        this.setState(() => {
                            return {
                                data: data.items,
                                count: data.count,
                                lastPage: data.lastPage,
                                pager: (data.pager !== undefined ? data.pager : pager),
                                loading: false
                            };
                        });
                    }
                })
                .catch((error) => {
                    this.setError(error);
                });

        } else if (Array.isArray(provider)) {
            this.setState(() => {
                return {
                    data: provider,
                    loading: false
                };
            })
        } else {
            this.setError('Unknown provider type');
        }
    }

    /**
     * Set component error
     */
    setError(errorText) {
        const {onError } = this.props;

        this.setState(() => {
            return {
                loading: false,
                error: `[Error]: ${errorText}`,
            }
        }, () => {
            if (typeof onError === "function") {
                onError(error);
            }
        });
    };

    /**
     * Render element
     */
    render() {

        const {
            classNameTable,
            classNameRow,
            extractId,
            renderError,
            renderLoading,
            renderTemplate
        } = this.props;

        const {
            data,
            count,
            lastPage,
            filter,
            pager,
            loading,
            error
        } = this.state;

        if (error) {
            return renderError(error);
        }

        if (loading) {
            return renderLoading();
        }

        // Columns
        let { children: columns } = this.props;

        if (!Array.isArray(columns)) {
            if (typeof columns === 'object') {
                columns = [ columns ];
            } else {
                return renderError('At least one column is required');
            }
        }

        // Table's data rows
        const tableRows = data.map((item) => {

            const row = columns.map((column) => {
                const { id, value, contentAttributes } = column.props;
                return (
                    <ContentCell
                        key={ id }
                        id={ id }
                        item={ item }
                        value={ value }
                        attributes={ contentAttributes }
                    />
                );
            });

            return (
                <tr key={ extractId(item) } className={ classNameRow } role="data-list-row">
                    { row }
                </tr>
            )
        });

        const table = (
            <table className={ classNameTable }>
                <HeaderRow columns={ columns } currentSort={ pager.sortBy } onChangeSort={ this.changeSort } />
                <tbody>
                    <FilterRow columns={ columns } currentFilter={ filter } onChangeFilter={ this.changeFilter }/>
                    { tableRows }
                </tbody>
            </table>
        );

        return (
            <div className="data-list">
                <OptionsProvider value={ this.options }>
                    {
                        renderTemplate(table, <PageBar { ...pager } totalCount={ count } lastPage={ lastPage } onParamChanged={ this.changePagerParam }/>)
                    }
                </OptionsProvider>
            </div>
        );
    }
}
import React from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom";

import DemoPage from './demo/DemoPage';
import StaticPage from "./static/StaticPage";
import PagingPage from "./paging/PagingPage";
import ProviderPage from "./provider/ProviderPage";
import FilteringPage from "./filtering/FilteringPage";
import RouterPage from "./router/RouterPage";
import CustomPage from "./custom/CustomPage";

function App() {
    return (
        <div className="example-app">
            <Router>
                <div className="container-fluid">
                    <div className="row mb-3">
                        <h1>React DataList examples</h1>
                    </div>

                    <div className="row">
                        <div className="col-md-2 pl-0 pr-0">
                            <div className="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
                                <NavLink to="/demo/" className="nav-link" activeClassName="active">Features demo</NavLink>
                                <NavLink to="/static/" className="nav-link" activeClassName="active">Static data</NavLink>
                                <NavLink to="/paging/" className="nav-link" activeClassName="active">Paging and sorting</NavLink>
                                <NavLink to="/provider/" className="nav-link" activeClassName="active">FetchProvider helper</NavLink>
                                <NavLink to="/filtering/" className="nav-link" activeClassName="active">Advanced filtering</NavLink>
                                <NavLink to='/router/?page=2&pageSize=10&sortBy=-averageRating&filter={"categories"%3A"fantasy"%2C"ageRating"%3A"R"}' className="nav-link" activeClassName="active">ReactRouter helper</NavLink>
                                <NavLink to="/custom/" className="nav-link" activeClassName="active">Custom filters</NavLink>
                            </div>

                            <div className="alert alert-success" role="alert" style={{marginTop: '1rem'}}>
                                Check out the install guide and API reference on <a href="https://rawg.io/apidocs" target="_blank">Github</a>
                            </div>
                        </div>

                        <div className="col-md-10">
                            <Switch>
                                <Route path="/static/" component={StaticPage}/>
                                <Route path="/paging/" component={PagingPage}/>
                                <Route path="/provider/" component={ProviderPage}/>
                                <Route path="/filtering/" component={FilteringPage}/>
                                <Route path="/router/" component={RouterPage}/>
                                <Route path="/custom/" component={CustomPage}/>
                                <Route path="/" component={DemoPage}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        </div>
    );
}

export default App;
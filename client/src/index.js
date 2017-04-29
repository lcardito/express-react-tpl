import React from "react";
import "./index.css";
import "semantic-ui/dist/semantic.min.css";
import {render} from "react-dom";
import {hashHistory, Route, Router} from "react-router";
import {Provider} from "react-redux";

import AppMenu from "./main/AppMenu";
import Sales from "./sales/Sales";
import EnsureLoggedInContainer from "./main/EnsureLoggedInContainer";

import {createStore} from "redux";
import LoginForm from "./main/LoginForm";
import cookie from "react-cookie";

function login(state = {}, action) {
    switch (action.type) {
        case 'LOG_IN':
            return state = {user: action.user};
        case 'LOG_OUT':
            cookie.remove('stock-sales.user');
            return state = {user: {}};
        default:
            return state;
    }
}

let store = createStore(login, {user: cookie.load('stock-sales.user')});

render((
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route component={AppMenu}>
                <Route path="/login" component={LoginForm}/>
                <Route component={EnsureLoggedInContainer}>
                    <Route path="/" component={Sales}/>
                </Route>
            </Route>
        </Router>
    </Provider>
), document.getElementById('root'));
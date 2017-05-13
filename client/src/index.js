import React from "react";
import "./index.css";
import "semantic-ui/dist/semantic.min.css";
import {render} from "react-dom";
import {hashHistory, Route, Router} from "react-router";
import {Provider} from "react-redux";

import AppMenu from "./main/AppMenu";
import EnsureLoggedInContainer from "./main/EnsureLoggedInContainer";
import Welcome from './main/Welcome';

import {createStore} from "redux";
import LoginForm from "./main/LoginForm";
import cookie from "react-cookie";

function login(state = {}, action) {
    switch (action.type) {
        case 'LOG_IN':
            return state = {user: action.user};
        case 'LOG_OUT':
            cookie.remove('application.user');
            return state = {user: {}};
        default:
            return state;
    }
}

let store = createStore(login, {user: cookie.load('application.user')});

render((
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route component={AppMenu}>
                <Route path="/login" component={LoginForm}/>
                <Route component={EnsureLoggedInContainer}>
                    <Route path="/" component={Welcome}/>
                </Route>
            </Route>
        </Router>
    </Provider>
), document.getElementById('root'));
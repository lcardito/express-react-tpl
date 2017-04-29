import React from 'react';

import {connect} from 'react-redux';
import {mapStateToProps} from "../transformer";
import GenericForm from "./GenericForm";
import Client from '../main/Client';

class LoginForm extends React.Component {
    //noinspection JSUnusedGlobalSymbols
    static contextTypes = {
        router: React.PropTypes.object,
    };

    constructor() {
        super();
        this.state = {
            error: false
        };

        this._submit = this._submit.bind(this);
    }

    componentDidMount() {
        const {isLoggedIn} = this.props;

        if (isLoggedIn) {
            //TODO use dispatch function to know where the user wanted to go
            // dispatch(setRedirectUrl(currentURL));
            this.context.router.replace("/");
        }
    }

    _submit(userData) {
        Client.login(userData, (response) => {
            if (response.errorStatus) {
                this.setState({
                    error: true
                });
            } else if (response) {
                this.props.dispatch({
                    type: 'LOG_IN',
                    user: response
                });
                this.context.router.replace("/");
            }
        });
    }

    render() {
        return <GenericForm
            fields={[
                {key: 'email', value: 'Email'},
                {key: 'password', value: 'Password'}
            ]}
            item={{email: '', password: ''}}
            editing={false}
            error={this.state.error}
            submitButton={{text: "Login", color: "green"}}
            submitCallback={this._submit}/>;
    }
}

export default connect(mapStateToProps)(LoginForm);
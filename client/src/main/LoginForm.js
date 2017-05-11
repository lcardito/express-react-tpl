import React from "react";

import {connect} from "react-redux";
import {mapStateToProps} from "../transformer";
import update from "immutability-helper";
import Client from "../main/Client";
import {Form, Message} from "semantic-ui-react";

class LoginForm extends React.Component {
    //noinspection JSUnusedGlobalSymbols
    static contextTypes = {
        router: React.PropTypes.object,
    };

    constructor() {
        super();
        this.state = {
            error: false,
            creds: {
                email: "",
                password: ""
            }
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

    _updateItem(event) {
        this.setState({
            item: update(this.state.creds, {
                $merge: {[event.target.name]: event.target.value}
            })
        });
    }

    render() {
        return <Form
            error={this.state.error}
            className='segment'
            onSubmit={this._submit.bind(this)}>
            <Message
                error
                header='Login Failed'
                content='Credentials are invalid' />
            <Form.Group widths='equal'>
                <Form.Input
                    label="Email"
                    name="email"
                    type="text"
                    value={this.state.creds.email}
                    onChange={this._updateItem} />
                <Form.Input
                    label="Password"
                    name="password"
                    type="password"
                    value={this.state.creds.password}
                    onChange={this._updateItem} />
            </Form.Group>
            <Form.Group>
                <Form.Button color="green" type="submit">Log in</Form.Button>
            </Form.Group>
        </Form>
    }
}

export default connect(mapStateToProps)(LoginForm);
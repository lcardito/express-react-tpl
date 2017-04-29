import React from 'react';
import {connect} from 'react-redux';
import {mapStateToProps} from "../transformer";

class EnsureLoggedInContainer extends React.Component {

    //noinspection JSUnusedGlobalSymbols
    static contextTypes = {
        router: React.PropTypes.object,
    };

    componentDidMount() {
        const {isLoggedIn} = this.props;

        if (!isLoggedIn) {
            //TODO use dispatch function to know where the user wanted to go
            // dispatch(setRedirectUrl(currentURL));
            this.context.router.replace("/login");
        }
    }

    render() {
        const {isLoggedIn} = this.props;
        if (isLoggedIn) {
            return this.props.children;
        } else {
            return null;
        }
    }
}

export default connect(mapStateToProps)(EnsureLoggedInContainer);
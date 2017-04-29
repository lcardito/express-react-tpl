module.exports.mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.user && state.user.username && state.user.username !== '',
        user: state.user,
        currentURL: ownProps.location.pathname
    };
};
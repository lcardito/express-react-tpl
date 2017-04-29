/* eslint-disable no-undef */
function login(user, cb) {
    fetch(`/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(checkStatus)
        .then(parseJSON)
        .then(cb)
        .catch(cb);
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.errorStatus = response.statusText;
    error.response = response;

    throw error;
}

function parseJSON(response) {
    return response.json();
}

const Client = {
    login: login
};

export default Client;

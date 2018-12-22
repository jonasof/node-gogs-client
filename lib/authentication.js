var base64 = require('base-64');

/**
 * Configures the authentication parameter for the user
 * Preference will be given to the token if it exists
 * @param options axios options
 * @param user the user for authentication. Requires token or username and password
 */
function setAuth(options, user) {
    if (!user) {
        return;
    }

    if (user.token) {
        setTokenAuth(options, user.token, user.auth_method)
    } else {
        options.headers['Authorization'] = 'Basic ' + base64.encode(user.username + ':' + user.password)
    }
}

function setTokenAuth(options, token, auth_method) {
    var sha1Token = token.sha1 || token;

    if (auth_method === 'query_string') {
        options.params['token'] = token
    } else {
        options.headers['Authorization'] = 'token ' + token
    }
}

module.exports = setAuth;

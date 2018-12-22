var axios = require('axios')

var setAuth = require('./authentication');

module.exports = Requester;

function Requester (apiUrl) {
  /**
   * Performs a request against the api
   * @param partialUrl the api command
   * @param user {object|null} the user authenticating this request. Requires token or username and password
   * @param postData {object|null} if not null the request will POST the data otherwise it will be a GET request
   * @param requestMethod {string|null} if null the requests will default to POST or GET
   * @return {Promise<string>}
   */
  return function request (partialUrl, user, postData, requestMethod) {
    var method = postData ? 'POST' : 'GET';
    method = requestMethod ? requestMethod.toUpperCase() : method;

    var options = {
      url: apiUrl.replace(/\/$/, '') + '/' + partialUrl.replace(/^\//, ''),
      method: method,
      data: postData,
      headers: {'Content-Type': 'application/json'},
      params: {}
    };

    setAuth(options, user);

    return new Promise(function (resolve, reject) {
      axios(options).then(function (response) {
        resolve({
          status: response.status,
          data: response.data
        });
      }).catch(function (error) {
        reject(error.response)
      })
    });
  };
}

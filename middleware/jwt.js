
const { auth } = require('express-oauth2-jwt-bearer');
const config = require("../config")

const checkScopes = requiredScopes('read:messages');

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: 'https://dev-ntg5ph6kts8y1iza.us.auth0.com/api/v2/',
  issuerBaseURL: config.auth0_baseURL,
});



module.exports = checkJwt, checkScopes;


// var request = require("request");

// var options = { method: 'POST',
//   url: 'https://dev-ntg5ph6kts8y1iza.us.auth0.com/oauth/token',
//   headers: { 'content-type': 'application/json' },
//   body: '{"client_id":"iSrlzg4MYkugMzCBy8L3BpqgA4GDdXyc","client_secret":"j-46U7ubveYux7QH0XmlagsuFMFbcPLGsJmtSuejcVjcpD9o0zGtTEM2LRq7cHBb","audience":"https://dev-ntg5ph6kts8y1iza.us.auth0.com/api/v2/","grant_type":"client_credentials"}' };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);
// });

// const axios = require("axios");
// const { config } = require('dotenv');

// const options = { 
//   method: "GET",
//   url: "http://path_to_your_api/",
//   headers: { "authorization": "Bearer TOKEN" },
// };

// axios(options)
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.log(error);
//   });
const config = require("../config");
const axios = require("axios");
var path = require("path");
// const { requiresAuth } = require("express-openid-connect");
// GET code https://dev-ntg5ph6kts8y1iza.us.auth0.com/authorize?response_type=code&client_id=iSrlzg4MYkugMzCBy8L3BpqgA4GDdXyc&redirect_uri=http://127.0.0.1:8080/callback&state=1234&scope=openid profile email
// POST token https://dev-ntg5ph6kts8y1iza.us.auth0.com/oauth/token?grant_type=authorization_code&client_id=iSrlzg4MYkugMzCBy8L3BpqgA4GDdXyc&client_secret=j-46U7ubveYux7QH0XmlagsuFMFbcPLGsJmtSuejcVjcpD9o0zGtTEM2LRq7cHBb&redirect_uri=http://127.0.0.1:8080/callback&scope=openid profile email&code=kM8N5-TWccOoK0bfZHUl-KlG3VoSPXfCPLYIngEJVArqK

const AuthController = {
  login: (req, res, next) => {
    // console.log("HERE!!!", config.redirect_uri);
    const authorizeURL = `${
      config.auth0_baseURL
    }/authorize?response_type=code&client_id=${
      config.auth0_id
    }&redirect_uri=${encodeURIComponent(
      config.redirect_uri
    )}&state=1234&scope=openid%20profile%20email`;
    // res.sendFile(path.join(__dirname, "../static/oauth.html"));
    console.log(authorizeURL);
    res.redirect(authorizeURL);
    next();
  },
  callback: async (req, res, next) => {
    if (!req.query.state == 1234) {
      res.status(400).error("State not verified");
    }
    try {
      const response = await fetch(`${config.auth0_baseURL}/oauth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: config.auth0_id,
          client_secret: config.auth0_secret,
          redirect_uri: config.redirect_uri,
          scope: "openid profile email",
          code: req.query.code,
        }),
      });

      const json = await response.json();
      res.json(json);

      console.log(json);
    } catch (error) {
      next(error);
    }
    next();
  },

  // for github auth
  // login: (req, res) => {
  //   res.redirect(config.githubClientUrl);
  //   // http://127.0.0.1:8080/oauth-callback?code=ade1a531dfbf48e24097
  // },

  // callback: async (req, res) => {
  //   const response = await fetch(
  //     "https://github.com/login/oauth/access_token",
  //   [{
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //       body: new URLSearchParams({
  //         grant_type: "authorization_code",
  //         client_id: config.client_id,
  //         client_secret: config.githubSecret,
  //         redirect_uri: config.redirect_uri,
  //         scope: "openid profile email",
  //         code: req.query.code,
  //       }),
  //     }]
  //   );
  //   const json = await response.json();
  //   res.json(json);

  // callback: async ({ query: { code } }, res) => {
  //   const body = {
  //     client_id: config.client_id,
  //     client_secret: config.githubSecret,
  //     // redirect_uri: "http://127.0.0.1:8080/callback",
  //     scope: "openid profile email",
  //     code,
  //     // redirect_uri: "https://recipeapi-vhb5.onrender.com/callback",
  //   };
  //   const opts = { headers: { accept: "application/json" } };
  //   // const response =
  //   await axios
  //     .post("https://github.com/login/oauth/access_token", body, opts)
  //     // .then(res.sendFile(path.join(__dirname, "../static/oauth.html")))
  //     .then((_res) => _res.data.access_token)
  //     .then(
  //       ((token) => {
  //         console.log("My token: ", token);
  //         res.redirect(`/?token=${token}`);
  //       }).catch((err) => res.status(500).json({ err: err.message }))
  //     );
  //   // if (!response.ok) {
  //   //   const message = `An error has occured: ${response.status}`;
  //   //   throw new Error(message);
  //   // }
  //   const json = body.json();
  //   res.json(json);
  // },

  // Initialize the Auth0 application
  // authorize: (req, res, next) => {
  //   var webAuth = new auth0.WebAuth({
  //     domain: "https://dev-ntg5ph6kts8y1iza.us.auth0.com",
  //     clientID: config.auth0_id,
  //   });

  //   // Parse the URL and extract the Access Token
  //   webAuth.parseHash(window.location.hash, function (err, authResult) {
  //     if (err) {
  //       return console.log(err);
  //     }
  //     webAuth.client.userInfo(authResult.accessToken, function (err, user) {
  //       // This method will make a request to the /userinfo endpoint
  //       // and return the user object, which contains the user's information,
  //       // similar to the response below.
  //     });
  //   });
  // },
  // profile: (req, res) => {
  //   // req.oidc.isAuthenticated();
  //   // res.send(JSON.stringify(req.oidc.user));
  // },
};

module.exports = AuthController;

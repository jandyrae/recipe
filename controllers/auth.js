const config = require("../config");
const axios = require("axios");
var path = require("path");

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
};

module.exports = AuthController;

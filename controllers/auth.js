const config = require("../config");
const axios = require("axios");
var path = require("path");

const AuthController = {
  load: (req, res, next) => {
    res.sendFile(path.join(__dirname, "../static/oauth.html"));
    // next(login);
  },

  login: async (req, res) => {
    await res.redirect(config.githubClientUrl);
  },

  callback: async (req, res) => {
    const response = await fetch(
      "https://github.com/login/oauth/access_token",
    [{
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: config.client_id,
          client_secret: config.githubSecret,
          redirect_uri: config.redirect_uri,
          scope: "openid profile email",
          code: req.query.code,
        }),
      }]
    );
    const json = await response.json();
    res.json(json);

  // callback: async ({ query: { code } }, res) => {
  //   const body = await {
  //     client_id: config.client_id,
  //     client_secret: config.githubSecret,
  //     redirect_uri: "http://127.0.0.1:8080/oauth-callback",
  //     scope: "openid profile email",
  //     code,
  //   };

  //   const opts = { headers: { accept: "application/json" } };
  //   const response = axios
  //     .post("https://github.com/login/oauth/access_token", body, opts)
  //     .then((_res) => _res.data.access_token)
  //     .then(
  //       ((token) => {
  //         console.log("My token: ", token);
  //         res.redirect(`/?token=${token}`);
  //       }).catch((err) => res.status(500).json({ err: err.message }))
  //     );
  //   if (!response.ok) {
  //     const message = `An error has occured: ${response.status}`;
  //     throw new Error(message);
  //   }
    //   const json = await body.json();
    // res.json(json);
  },
};

module.exports = AuthController;

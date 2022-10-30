const dotenv = require("dotenv");
dotenv.config();

const mongoUrl = process.env.DB_URI;
const renderAPI = process.env.RENDER_APIKEY;
const dbName = process.env.DB_NAME;
const githubClientUrl = process.env.GITHUB_CLIENT_ID;
const githubSecret = process.env.GITHUB_SECRET;
const redirect_uri = process.env.REDIRECT;
const client_id = process.env.CLIENT_ID;

module.exports = {
  mongoUrl, renderAPI, dbName, githubClientUrl, githubSecret, dotenv, redirect_uri, client_id
};

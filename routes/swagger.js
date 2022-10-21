const app = require('express').Router();
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger.json");

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app;
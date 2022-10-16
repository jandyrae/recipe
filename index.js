const express = require("express");
const config = require("./config/index");
const bodyParser = require("body-parser");
const cors = require("./middleware/opencors");
const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger.json");

const port = config.PORT || 8080;
const connectDB = require("./models/connectDB");

app
  .use([cors, bodyParser.json()])
  .use((req, res, next) => {
    console.log("Time: ", Date.now());
    next();
  })
  .use("/", require("./routes/index"))
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
  console.log(
    `Application listening on http://localhost:8080/ or ${port} see API documentation on http://localhost:8080/api-docs/`
  );
});

connectDB().catch(console.error);

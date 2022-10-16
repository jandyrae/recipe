const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Recipe API",
    description: "Simple API for recipe information.",
  },
  host: "http://localhost:8080",
  schemes: ["http", "https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./index"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
  require("./index");
});

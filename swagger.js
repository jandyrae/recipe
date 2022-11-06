const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    version: "1.0.0",
    title: "Recipe API",
    description: "Simple API for recipes and the author's information.",
  },
  host: "",
  schemes: ["http", "https"],
  tags: [
    // by default: empty Array
    {
      name: "Description",
      description:
        "This API has two endpoints, one is recipe document retrieval, add new, update, or delete. The other holds recipe authors information with the same abilities. See model for required fields.",
    },
  ],
  securityDefinitions: {
    OAuth2: {
      type: "https",
      name: "Authorization",
      scheme: "bearer",
      in: "header",
    }, //https://github.com/davibaltar/swagger-autogen#bearer-auth-example
  },
  definitions: {
    recipeArrayExample: {
      $recipeName: "Recipe Name",
      $cookTemp: "350 Degrees",
      $cookTime: "30 minutes",
      mealType: "salads",
      mealTime: "dinner",
      $ingredients: ["array", "of", "ingredients"],
      $directions: "how to",
      rating: "5",
      difficulty: "easy",
      $fromKitchenOf: "any@email.com",
    },
    fromKitchenOfExample: {
      $firstName: "First",
      $lastName: "Last",
      $email: "mustBe@email.com",
      $phoneNumber: "801-555-555",
    },
  },

};

const outputFile = "./swagger.json";
const endpointsFiles = ["./index"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
  require("./index");
});

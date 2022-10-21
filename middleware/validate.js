const validator = require("../helpers/validate");

const createRecipe = (req, res, next) => {
  const validationRule = {
    recipeName: "required|string",
    cookTemp: "required|string",
    cookTime: "required|string",
    mealType: "string",
    mealTime: "string",
    ingredients: "required|array",
    directions: "required|string",
    rating: "integer",
    difficulty: "string",
    fromKitchenOf: "required|email",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const saveContact = (req, res, next) => {
  const validationRule = {
    firstName: "required|string",
    lastName: "required|string",
    email: "required|email",
    phoneNumber: "required|alpha_dash",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  createRecipe,
  saveContact,
};

// https://www.npmjs.com/package/validatorjs

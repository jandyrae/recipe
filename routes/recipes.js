const express = require("express");
const router = express.Router();
const validation = require("../middleware/validate");

const {
  getAllRecipes,
  getOneRecipe,
  createRecipe,
} = require("../controllers/recipe");

router.get("/", getAllRecipes);
router.get("/:id", getOneRecipe);
// router.put("/:id", updateRecipe);
// router.delete("/:id", deleteRecipe);
router.post("/", validation.createRecipe, createRecipe);

module.exports = router;

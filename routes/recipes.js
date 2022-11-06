const express = require("express");
const router = express.Router();
const validation = require("../middleware/validate");
const opencors = require("../middleware/opencors");

const {
  getAllRecipes,
  getOneRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe
} = require("../controllers/recipe");

router.use([opencors]);
router.get("/", getAllRecipes);
router.post("/", validation.createRecipe, createRecipe);
router.get("/:id", getOneRecipe);
router.put("/:id", validation.createRecipe, updateRecipe);
router.delete("/:id", deleteRecipe);


module.exports = router;

const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipe.controller");

const router = express.Router();

router.post("/create-recipe", isAuthenticated, createRecipe);
router.put("/:id", isAuthenticated, updateRecipe);
router.get("/get-recipes", isAuthenticated, getRecipes);

router.get("/:id", isAuthenticated, getRecipeById);
router.delete("/:id", isAuthenticated, deleteRecipe);

module.exports = router;

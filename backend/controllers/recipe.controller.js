const Recipe = require("../models/recipe.model");

const createRecipe = async (req, res) => {
  console.log("create recipe request received");
  const { recipeName, ingredients, steps, userId } = req.body;

  try {
    const newRecipe = new Recipe({ recipeName, ingredients, steps, userId });
    await newRecipe.save();

    res
      .status(201)
      .json({ message: "Recipe created successfully", recipe: newRecipe });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("userId");
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// const getRecipeById = async (req, res) => {
//   try {
//     console.log("fetch request received");
//     console.log(req.params.id);
//     const recipe = await Recipe.findBy;

//     // .populate(
//     //   "userId",
//     //   "username email"
//     // );
//     console.log(recipe);
//     res.status(200).json(recipe);
//   } catch (err) {
//     res.status(404).json({ error: err.message });
//   }
// };

const getRecipeById = async (req, res) => {
  try {
    const userId = req.params.id; // Extract userId from query parameters

    console.log("userId:", userId);

    let recipes;
    if (userId) {
      console.log("userId:", userId);
      // Find recipes for a specific user
      recipes = await Recipe.find({ userId });
    } else {
      throw new Error("User ID is required");
    }

    console.log("recipes:", recipes);

    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateRecipe = async (req, res) => {
  const { recipeName, ingredients, steps } = req.body;

  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this recipe" });
    }

    recipe.recipeName = recipeName;
    recipe.ingredients = ingredients;
    recipe.steps = steps;
    await recipe.save();

    res.status(200).json({ message: "Recipe updated successfully", recipe });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this recipe" });
    }

    await recipe.remove();
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};

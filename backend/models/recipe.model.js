const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {
    recipeName: {
      type: String,
      required: true,
      trim: true,
    },
    ingredients: {
      type: [String], // Array of strings to hold multiple ingredients
      required: true,
    },
    steps: {
      type: [String], // Array of strings to hold multiple steps
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      ref: "User", // Refers to the User collection
      required: true, // Ensure that every recipe is associated with a user
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;

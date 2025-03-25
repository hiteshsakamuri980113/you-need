import React from "react";

function ViewRecipe() {
  const recipe = {
    name: "Spaghetti Bolognese",
    ingredients: [
      "200g spaghetti",
      "100g minced beef",
      "1 onion, chopped",
      "2 garlic cloves, minced",
      "400g canned tomatoes",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Cook the spaghetti according to the package instructions.",
      "In a pan, sauté the onion and garlic until soft.",
      "Add the minced beef and cook until browned.",
      "Stir in the canned tomatoes and simmer for 15 minutes.",
      "Season with salt and pepper.",
      "Serve the sauce over the cooked spaghetti.",
    ],
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>{recipe.name}</h1>
      <h2>Ingredients</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {recipe.ingredients.map((ingredient, index) => (
          <li
            key={index}
            style={{
              margin: "5px 0",
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            {ingredient}
          </li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <ol style={{ textAlign: "left", maxWidth: "600px", margin: "0 auto" }}>
        {recipe.instructions.map((instruction, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            {instruction}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ViewRecipe;

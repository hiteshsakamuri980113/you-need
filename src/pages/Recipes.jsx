import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react"; // Import useNavigate for navigation
import { AuthContext } from "../context/AuthContext";

function Recipes() {
  const [recipeList, setRecipeList] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null); // Track which menu is open
  const { user } = useContext(AuthContext); // Access user from AuthContext
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch recipes when the component mounts
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const userId = user ? user._id : null; // Get the user ID from the context
        console.log("fetching recipes for user:", userId);
        const response = await fetch(`/api/recipes/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
          credentials: "include",
        }); // Fetch recipes for the user

        // console.log(user);

        // Adjusted endpoint
        if (response.ok) {
          const data = await response.json();
          console.log("data:", data);
          setRecipeList(data);
        }
      } catch (err) {
        console.error("An error occurred:", err);
      }
    };

    fetchRecipes();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-recipe/${id}`); // Navigate to the EditRecipe page with the recipe ID
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/recipes/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setRecipeList(recipeList.filter((recipe) => recipe._id !== id)); // Remove the deleted recipe from the list
      }
    } catch (err) {
      console.error("Error deleting recipe:", err);
    }
  };

  const toggleMenu = (id) => {
    setMenuOpen(menuOpen === id ? null : id); // Toggle the menu for the specific recipe
  };

  return (
    <div className="bg-gradient-to-b from-teal-300 via-orange-200 to-pink-300 min-h-screen flex flex-col items-center py-8 px-4">
      <h1 className="text-5xl font-extrabold text-gray-800 text-center mb-6">
        Recipes
      </h1>
      <p className="text-lg text-gray-600 text-center mb-8">
        Explore a variety of delicious recipes below:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {recipeList.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow relative"
          >
            {/* Three-dot menu */}
            <div className="absolute top-4 right-4">
              <button
                onClick={() => toggleMenu(recipe._id)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                &#x22EE; {/* Vertical three-dot icon */}
              </button>
              {menuOpen === recipe._id && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => handleEdit(recipe._id)}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(recipe._id)}
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {recipe.recipeName}
            </h2>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Ingredients:
            </h3>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Steps:</h3>
            <ol className="list-decimal list-inside text-gray-600 mb-4">
              {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recipes;

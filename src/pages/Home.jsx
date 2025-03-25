import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const handleCreateRecipe = () => {
    navigate("/create-recipe");
  };

  const handleViewRecipes = () => {
    navigate("/recipes");
  };

  return (
    <div className="bg-gradient-to-b from-teal-300 via-orange-200 to-pink-300 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-4xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
            Welcome to <span className="text-teal-600">You need?</span>
          </h1>
          <p className="text-lg text-gray-600">
            Discover, create, and manage your favorite recipes all in one place!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Your Recipes
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Browse through your saved recipes and get cooking!
            </p>
            <button
              onClick={() => handleViewRecipes()}
              className="px-6 py-3 bg-teal-500 text-black font-semibold rounded-lg shadow-lg hover:bg-teal-600 transition"
            >
              Explore
            </button>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Create Recipe
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Create a new recipe and add it to your collection!
            </p>
            <button
              onClick={() => handleCreateRecipe()}
              className="px-6 py-3 bg-orange-500 text-black font-semibold rounded-lg shadow-lg hover:bg-orange-600 transition"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

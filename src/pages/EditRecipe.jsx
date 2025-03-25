import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditRecipe() {
  const { id } = useParams(); // Get the recipe ID from the route parameters
  const navigate = useNavigate();

  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [currentStep, setCurrentStep] = useState("");

  // Fetch the existing recipe data
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/recipes/${id}`);
        if (response.ok) {
          const data = await response.json();
          setRecipeName(data.recipeName);
          setIngredients(data.ingredients);
          setSteps(data.steps);
        }
      } catch (err) {
        console.error("Error fetching recipe:", err);
      }
    };

    fetchRecipe();
  }, [id]);

  // Handle adding an ingredient
  const handleAddIngredient = () => {
    if (currentIngredient.trim() !== "") {
      setIngredients([...ingredients, currentIngredient]);
      setCurrentIngredient("");
    }
  };

  // Handle adding a step
  const handleAddStep = () => {
    if (currentStep.trim() !== "") {
      setSteps([...steps, currentStep]);
      setCurrentStep("");
    }
  };

  // Handle deleting an ingredient
  const handleDeleteIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  // Handle deleting a step
  const handleDeleteStep = (index) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedRecipe = {
      recipeName,
      ingredients,
      steps,
    };

    try {
      const response = await fetch(`/api/recipes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRecipe),
      });

      if (response.ok) {
        navigate("/recipes"); // Redirect to the recipes page
      }
    } catch (err) {
      console.error("Error updating recipe:", err);
    }
  };

  return (
    <div className="bg-gradient-to-b from-teal-300 via-orange-200 to-pink-300 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-7xl w-full">
        <h1 className="text-5xl font-extrabold text-gray-800 text-center mb-8">
          Edit Recipe
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          Update the details of your recipe below:
        </p>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Recipe Name Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Recipe Name
            </h2>
            <input
              type="text"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              placeholder="Enter recipe name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Ingredients Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Ingredients
            </h2>
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                value={currentIngredient}
                onChange={(e) => setCurrentIngredient(e.target.value)}
                placeholder="Enter an ingredient"
                className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="button"
                onClick={handleAddIngredient}
                className="px-4 py-2 bg-black text-white font-semibold rounded-lg shadow-lg hover:bg-gray-800 transition"
              >
                Add
              </button>
            </div>
            <div className="space-y-2">
              {ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm"
                >
                  <span className="text-gray-700">{ingredient}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteIngredient(index)}
                    className="w-6 h-6 flex items-center justify-center bg-black text-white font-bold rounded-full hover:bg-gray-800 transition"
                    aria-label="Delete ingredient"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Steps Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Steps</h2>
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                value={currentStep}
                onChange={(e) => setCurrentStep(e.target.value)}
                placeholder="Enter a step"
                className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="button"
                onClick={handleAddStep}
                className="px-4 py-2 bg-black text-white font-semibold rounded-lg shadow-lg hover:bg-gray-800 transition"
              >
                Add
              </button>
            </div>
            <div className="space-y-2">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm"
                >
                  <span className="text-gray-700">{step}</span>
                  <button
                    type="button"
                    onClick={() => handleDeleteStep(index)}
                    className="w-6 h-6 flex items-center justify-center bg-black text-white font-bold rounded-full hover:bg-gray-800 transition"
                    aria-label="Delete step"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </form>
        <button
          type="submit"
          onClick={handleSubmit}
          className="mt-8 w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 px-4 rounded-lg font-semibold shadow-lg hover:opacity-90 transition"
        >
          Update Recipe
        </button>
      </div>
    </div>
  );
}

export default EditRecipe;

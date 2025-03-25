import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

function CreateRecipe() {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [currentStep, setCurrentStep] = useState("");
  const [editingStepIndex, setEditingStepIndex] = useState(null); // Track which step is being edited
  const [editingStepValue, setEditingStepValue] = useState(""); //
  // Track the value of the step being edited

  const navigate = useNavigate();
  const { isAuthenticated, user } = useContext(AuthContext); // Access AuthContext

  const handleAddIngredient = () => {
    if (currentIngredient.trim() !== "") {
      setIngredients([...ingredients, currentIngredient]);
      setCurrentIngredient("");
    }
  };

  const handleAddStep = () => {
    if (currentStep.trim() !== "") {
      setSteps([...steps, currentStep]);
      setCurrentStep("");
    }
  };

  const handleDeleteIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleDeleteStep = (index) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleEditStep = (index) => {
    console.log("Editing step at index:", index);
    setEditingStepIndex(index); // Set the index of the step being edited
    setEditingStepValue(steps[index]); // Set the current value of the step being edited
  };

  const handleUpdateStep = (index) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = editingStepValue; // Update the step with the new value
    setSteps(updatedSteps); // Update the steps array
    setEditingStepIndex(null); // Reset the editing index
    setEditingStepValue(""); // Clear the editing value
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("You must be logged in to create a recipe.");
      return;
    }

    console.log("User data:", user);

    try {
      const recipe = {
        recipeName,
        ingredients,
        steps,
        userId: user._id, // Include the logged-in user's ID
      };

      console.log("Recipe data:", recipe);

      const response = await fetch("/api/recipes/create-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });

      if (response.ok) {
        // const data = await response.json();
        navigate("/recipes");
      }
    } catch (err) {
      alert("An error occurred. Please try again later.");
    }

    // Add logic to send the recipe to the backend
  };

  return (
    <div className="bg-gradient-to-b from-teal-300 via-orange-200 to-pink-300 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-7xl w-full">
        <h1 className="text-5xl font-extrabold text-gray-800 text-center mb-8">
          Create a New Recipe
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          Fill in the details below to share your recipe with the world.
        </p>
        <form
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          onSubmit={handleSubmit}
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
            {recipeName && (
              <p className="mt-4 text-lg text-gray-700 font-semibold">
                <span className="text-black">{recipeName}</span>
              </p>
            )}
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
                className="px-4 py-2 bg-black text-black font-semibold rounded-lg shadow-lg hover:bg-gray-800 transition"
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
                    onClick={() => handleDeleteIngredient(index)}
                    className="w-6 h-6 flex items-center justify-center bg-black text-black font-bold rounded-full hover:bg-gray-800 transition"
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
                className="px-4 py-2 bg-black text-black font-semibold rounded-lg shadow-lg hover:bg-gray-800 transition"
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
                  {editingStepIndex === index ? (
                    <input
                      type="text"
                      value={editingStepValue}
                      onChange={(e) => setEditingStepValue(e.target.value)}
                      className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  ) : (
                    <span className="text-gray-700">{step}</span>
                  )}
                  <div className="flex items-center gap-2">
                    {editingStepIndex === index ? (
                      <button
                        type="button" // Prevents form submission
                        onClick={() => handleUpdateStep(index)}
                        className="px-2 py-1 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-600 transition"
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        type="button" // Prevents form submission
                        onClick={() => handleEditStep(index)}
                        className="px-2 py-1 bg-blue-500 text-black font-semibold rounded-lg hover:bg-blue-600 transition"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      type="button" // Prevents form submission
                      onClick={() => handleDeleteStep(index)}
                      className="w-6 h-6 flex items-center justify-center bg-black text-black font-bold rounded-full hover:bg-gray-800 transition"
                      aria-label="Delete step"
                    >
                      ×
                    </button>
                  </div>
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
          Submit Recipe
        </button>
      </div>
    </div>
  );
}

export default CreateRecipe;

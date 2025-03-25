import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../styles/Landing.css"; // Import Tailwind CSS

function Landing() {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-teal-600">You Need?</div>
        <nav className="flex items-center gap-6">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow hover:bg-teal-700 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-2 bg-yellow-400 text-gray-800 font-semibold rounded-lg shadow hover:bg-yellow-500 transition"
          >
            Sign Up
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center text-center text-gray-800 flex-grow px-6 py-20 bg-gray-100">
        <h1 className="text-5xl font-bold mb-6 text-teal-600">
          Welcome to You Need?
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-8 text-gray-600">
          Discover, create, and manage your favorite recipes with ease. Whether
          you're a seasoned chef or just starting out, You Need? is here to make
          your cooking journey exciting and effortless.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow hover:bg-teal-700 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-2 bg-yellow-400 text-gray-800 font-semibold rounded-lg shadow hover:bg-yellow-500 transition"
          >
            Sign Up
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-12 px-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Why Choose You Need?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-bold text-teal-600 mb-4">
              Discover Recipes
            </h3>
            <p className="text-gray-600">
              Explore a wide variety of recipes from around the world. Find
              inspiration for your next meal!
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-bold text-orange-600 mb-4">
              Create Your Own
            </h3>
            <p className="text-gray-600">
              Add your own recipes and keep them organized in one place. Share
              your culinary creations with others!
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-bold text-pink-600 mb-4">
              Manage Effortlessly
            </h3>
            <p className="text-gray-600">
              Keep track of your favorite recipes, ingredients, and cooking
              instructions with ease.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-teal-600 text-white py-12 px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Start Your Cooking Journey?
        </h2>
        <p className="text-lg mb-6">
          Join You Need? today and unlock a world of culinary possibilities.
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="px-8 py-3 bg-yellow-400 text-gray-800 font-semibold rounded-lg shadow hover:bg-yellow-500 transition"
        >
          Get Started
        </button>
      </section>
    </div>
  );
}

export default Landing;

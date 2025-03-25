import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, user, setUser } =
    useContext(AuthContext); // Access AuthContext
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Make an API call to log out the user (if applicable)
      const response = await fetch("/api/user/logout", {
        method: "POST",
        credentials: "include", // Include cookies if using session-based auth
      });

      if (response.ok) {
        // Clear authentication state
        setIsAuthenticated(false);
        setUser(null);

        // Redirect to the login page
        navigate("/login");
      } else {
        console.error("Failed to log out");
      }
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  // Render nothing if the user is not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <nav>
        <div className="flex items-center gap-4">
          <span>Welcome, {user?.username || "User"}!</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-black px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;

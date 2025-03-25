import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Function to check session
  const checkSession = async () => {
    try {
      console.log("Checking session...");
      const response = await fetch("/api/user/check-session", {
        credentials: "include", // Include cookies for session validation
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        console.log("Session is active:", data);
        setIsAuthenticated(true); // Update authentication state
      } else {
        console.log("Session is not active");
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error("Error checking session:", err);
      setIsAuthenticated(false);
    }
  };

  // Check session when the app loads
  useEffect(() => {
    const validateSession = async () => {
      console.log("authcontext useeffect is running");
      setLoading(true);
      console.log("setting loading to true");
      await checkSession();
      setLoading(false);
      console.log("setting loading to false");
    };

    validateSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        setIsAuthenticated,
        loading,
        checkSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

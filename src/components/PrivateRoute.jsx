import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  console.log("PrivateRoute");
  const { isAuthenticated, loading } = useContext(AuthContext);

  console.log("isAuthenticated:", isAuthenticated);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner while checking authentication
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
// In this snippet, we import React, useContext, and Navigate from react-router-dom, and AuthContext from the context folder. We then create a functional component called PrivateRoute that takes children as a prop. We use the useContext hook to access the isAuthenticated and loading state variables from the AuthContext.

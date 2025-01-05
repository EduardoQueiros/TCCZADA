import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userLogin = localStorage.getItem("userLogin");

  if (!userLogin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;

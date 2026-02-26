import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole = "admin" }) => {
  const { user, token } = useSelector((state) => state.auth);

  // Check if user is authenticated and has the required role
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole === "admin" && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function PrivateHome({ children }) {
  const location = useLocation();
  if (localStorage.getItem("role") === "user") {
    return <Navigate to="/dashboard" state={{ from: location }} />;
  }
  return children;
}

export default PrivateHome;
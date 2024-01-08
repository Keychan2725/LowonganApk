import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function PrivateReg({ children }) {
  const location = useLocation();
  if (!localStorage.getItem("id")) {
    return <Navigate to="/registrasi" state={{ from: location }} />;
  }
  return children;
}

export default PrivateReg;
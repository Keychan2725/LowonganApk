import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function PrivateUpload({ children }) {
  const location = useLocation();
  if (localStorage.getItem("idFoto")) {
    return <Navigate to="/tambah-pekerjaan" state={{ from: location }} />;
  }
  return children;
}

export default PrivateUpload;
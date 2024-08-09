import React from "react";
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const authStatus = Cookies.get("authStatus");
  console.log("auth : ",authStatus)

  if (!authStatus) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute

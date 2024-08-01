import React from "react";
import { useNavigate } from "react-router-dom";
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
//   const authStatus = Cookies.get("authStatus");
  const authStatus = true;
  const location = useLocation();
  console.log(authStatus)
  const navigate = useNavigate();

  if (!authStatus) {
    // navigate("/login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute

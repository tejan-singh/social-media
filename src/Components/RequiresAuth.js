import React from "react";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const RequiresAuth = ({ children }) => {
  const {
    authState: { isLoggedIn },
  } = useContext(AuthContext);
  //current route
  const location = useLocation();

  // if logged in the show children else take to login page
  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default RequiresAuth;

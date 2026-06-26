import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const ProtectedRoute = () => {
  return isAuthenticated()
    ? React.createElement(Outlet)
    : React.createElement(Navigate, {
        to: "/login",
        replace: true,
      });
};

export default ProtectedRoute;
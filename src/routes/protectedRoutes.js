import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "@services/authStorage";

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const ProtectedRoute = ({ roles }) => {
  if (!isAuthenticated()) {
    return React.createElement(Navigate, {
      to: "/login",
      replace: true,
    });
  }

  const user = getUser();

  if (roles && !roles.includes(user.role)) {
    return React.createElement(Navigate, {
      to: "/dashboard",
      replace: true,
    });
  }

  return React.createElement(Outlet);
};

export default ProtectedRoute;
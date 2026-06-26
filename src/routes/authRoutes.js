import LoginPage from "../pages/auth/Login/LoginPage"
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import React from "react"

/**
 * @typedef {import("react-router-dom").RouteObject} RouteObject
 */

/** @type {RouteObject[]} */
const authRoutes = [
  {
    path: "/login",
    element: React.createElement(LoginPage)
  },
  {
    path: "/register",
    element: React.createElement(RegisterPage)
  },
  {
    path: "/forgot-password",
    element: React.createElement(ForgotPasswordPage)
  }
];

export default authRoutes;
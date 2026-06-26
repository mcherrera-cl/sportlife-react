import React from "react";
import HomePage from "../pages/Home";
import LoginPage from "../pages/auth/Login";
import RegisterPage from "../pages/auth/Register";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import MainLayout from "../layouts/MainLayout";

/**
 * @typedef {import("react-router-dom").RouteObject} RouteObject
 */

/** @type {RouteObject[]} */
const publicRoutes = [
  {
    element: React.createElement(MainLayout),
    children: [
      {
        path: "/",
        element: React.createElement(HomePage),
      },
      {
        path: "/login",
        element: React.createElement(LoginPage),
      },
      {
        path: "/register",
        element: React.createElement(RegisterPage),
      },
      {
        path: "/forgot-password",
        element: React.createElement(ForgotPasswordPage),
      },
    ],
  },
];

export default publicRoutes;

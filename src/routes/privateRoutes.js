import React from "react";
import ProtectedRoute from "./protectedRoutes";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ProfilePage from "../pages/dashboard/ProfilePage";

/**
 * @typedef {import("react-router-dom").RouteObject} RouteObject
 */

/** @type {RouteObject[]} */
const privateRoutes = [
  {
    element: React.createElement(ProtectedRoute),
    children: [
      {
        path: "/dashboard",
        element: React.createElement(DashboardLayout),
        children: [
          {
            index: true,
            element:  React.createElement(Dashboard)
          },
          {
            path: "profile",
            element: React.createElement(ProfilePage)
          }
        ]
      }
    ],
  },
];

export default privateRoutes;
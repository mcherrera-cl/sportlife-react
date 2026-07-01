import React from "react";
import ProtectedRoute from "./protectedRoutes";
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";

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
          }
        ]
      }
    ],
  },
];

export default privateRoutes;
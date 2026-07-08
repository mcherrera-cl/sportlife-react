import React from "react";
import ProtectedRoute from "./protectedRoutes";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ProfilePage from "../pages/dashboard/ProfilePage";
import ReservationsPage from "../pages/dashboard/reservations/Reservation";
import SettingsPage from "../pages/dashboard/settings/SettingsPage";
import UsersPage from "../pages/dashboard/users/UsersPage";
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
          },
          {
            path: "settings",
            element: React.createElement(SettingsPage)
          },
          {
            path: "users",
            element: React.createElement(ProtectedRoute, {roles: ["admin"]}),
            children: [
              {index: true,  element: React.createElement(UsersPage)}
            ]
          },
          {
            path: "reservations",
            element: React.createElement(ProtectedRoute, {roles: ["user"]}),
            children: [
              {index: true, element: React.createElement(ReservationsPage)}
            ]
          }
        ]
      }
    ],
  },
];

export default privateRoutes;
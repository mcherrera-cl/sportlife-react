import React from "react";
import ProtectedRoute from "./protectedRoutes";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ProfilePage from "../pages/dashboard/ProfilePage";
import ReservationsPage from "../pages/dashboard/user/reservations/Reservation";
import SettingsPage from "../pages/dashboard/settings/SettingsPage";
import UsersPage from "../pages/dashboard/admin/users/UsersPage";
import RoomsPage from "../pages/dashboard/admin/rooms/RomsPage";
import SportsPage from "../pages/dashboard/admin/sports/SportPage";
import SportRoomsPage from "../pages/dashboard/admin/sportrooms/SportRoomsPage";
import ClassSchedulesPage from "../pages/dashboard/admin/class-schedules/ClassSchedulesPage";

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
            element: React.createElement(Dashboard),
          },
          {
            path: "profile",
            element: React.createElement(ProfilePage),
          },
          {
            path: "settings",
            element: React.createElement(SettingsPage),
          },
          {
            path: "users",
            element: React.createElement(ProtectedRoute, { roles: ["admin"] }),
            children: [
              { index: true, element: React.createElement(UsersPage) },
            ],
          },
          {
            path: "rooms",
            element: React.createElement(ProtectedRoute, { roles: ["admin"] }),
            children: [
              { index: true, element: React.createElement(RoomsPage) },
            ],
          },
          {
            path: "sports",
            element: React.createElement(ProtectedRoute, { roles: ["admin"] }),
            children: [
              { index: true, element: React.createElement(SportsPage) },
            ],
          },
          {
            path: "sport-rooms",
            element: React.createElement(ProtectedRoute, { roles: ["admin"] }),
            children: [
              { index: true, element: React.createElement(SportRoomsPage) },
            ],            
          },
          {
            path: "schedules",
            element: React.createElement(ProtectedRoute, { roles: ["admin"] }),
            children: [
              { index: true, element: React.createElement(ClassSchedulesPage) },
            ],            
          },
          {
            path: "reservations",
            element: React.createElement(ProtectedRoute, { roles: ["user"] }),
            children: [
              { index: true, element: React.createElement(ReservationsPage) },
            ],
          },
        ],
      },
    ],
  },
];

export default privateRoutes;

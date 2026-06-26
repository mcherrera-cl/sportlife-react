import { useRoutes } from "react-router-dom"
import React from "react"

import publicRoutes from "./publicRoutes"
import privateRoutes from "./privateRoutes"

/**
 * @typedef {import("react-router-dom").RouteObject} RouteObject
 */

/** @type {RouteObject[]} */
export default function AppRoutes() {
    return useRoutes([
        ...publicRoutes,
        ...privateRoutes,
        {
            path: "*",
            element: React.createElement("h1", null, "404 Página no encontrada")
        }
    ])
}
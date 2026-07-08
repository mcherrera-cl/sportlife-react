import { request } from "./http";

export function getUsers() {
  return request("/users", {
    method: "GET",
    requiereAuth: true
  })
}

export function crearUsuario(payload) {
  return request("/users", {
    method: "POST",
    requiereAuth: true,
    body: JSON.stringify(payload),
  });
}


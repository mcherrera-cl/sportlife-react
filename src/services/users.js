import { request } from "./http";

export function crearUsuario(payload) {
  return request("/users", {
    method: "POST",
    requiereAuth: true,
    body: JSON.stringify(payload),
  });
}


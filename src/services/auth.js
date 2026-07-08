import { request } from "./http";

export function login(email, password) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export function register(payload) {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function crearUsuario(payload) {
  return request("/users", {
    method: "POST",
    requiereAuth: true,
    body: JSON.stringify(payload),
  });
}

export function actualizarPerfil(payload) {
    return request("/auth/me", {
      method: "PUT",
      requiereAuth: true,
      body: JSON.stringify(payload)
    })
}
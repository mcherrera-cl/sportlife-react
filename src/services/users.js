import { request } from "./http";

export function getUsers() {
  return request("/users", {
    method: "GET",
    requiereAuth: true
  })
}

export function createUser(payload) {
  return request("/users", {
    method: "POST",
    requiereAuth: true,
    body: JSON.stringify(payload),
  });
}

export function updateUser(id, payload) {
  return request(`/users/${id}`, {
    method: "PUT",
    requiereAuth: true,
    body: JSON.stringify(payload),
  });
}

export function deleteUser(id) {
  return request(`/users/${id}`, {
    method: "DELETE",
    requiereAuth: true
  })
}
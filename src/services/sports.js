import { request } from "./http";

export function getSports() {
  return request("/sports", {
    method: "GET",
    requiereAuth: true,
  });
}

export function getSport(id) {
  return request(`/sports/${id}`, {
    method: "GET",
    requiereAuth: true,
  });
}

export function createSport(payload) {
  return request("/sports", {
    method: "POST",
    requiereAuth: true,
    body: JSON.stringify(payload),
  });
}

export function updateSport(id, payload) {
  return request(`/sports/${id}`, {
    method: "PUT",
    requiereAuth: true,
    body: JSON.stringify(payload),
  });
}

export function deleteSport(id) {
  return request(`/sports/${id}`, {
    method: "DELETE",
    requiereAuth: true,
  });
}
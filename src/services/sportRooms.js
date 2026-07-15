import { request } from "./http";

export function getSportRooms() {
  return request("/sport-rooms", {
    method: "GET",
    requiereAuth: true,
  });
}

export function getSportRoom(id) {
  return request(`/sport-rooms/${id}`, {
    method: "GET",
    requiereAuth: true,
  });
}

export function createSportRoom(payload) {
  return request("/sport-rooms", {
    method: "POST",
    requiereAuth: true,
    body: JSON.stringify(payload),
  });
}

export function updateSportRoom(id, payload) {
  return request(`/sport-rooms/${id}`, {
    method: "PUT",
    requiereAuth: true,
    body: JSON.stringify(payload),
  });
}

export function deleteSportRoom(id) {
  return request(`/sport-rooms/${id}`, {
    method: "DELETE",
    requiereAuth: true,
  });
}
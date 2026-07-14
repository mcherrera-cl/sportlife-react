import { request } from "./http";

export function getRooms() {
  return request("/rooms", {
    method: "GET",
    requiereAuth: true,
  });
}

export function createRoom(payload) {
  return request("/rooms", {
    method: "POST",
    requiereAuth: true,
    body: JSON.stringify(payload),
  });
}

export function updateRoom(id, payload) {
  return request(`/rooms/${id}`, {
    method: "PUT",
    requiereAuth: true,
    body: JSON.stringify(payload),
  });
}

export function deleteRoom(id) {
  return request(`/rooms/${id}`, {
    method: "DELETE",
    requiereAuth: true,
  });
}
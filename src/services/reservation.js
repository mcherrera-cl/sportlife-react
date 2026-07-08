import { request } from "./http";

export function getReservations() {
  return request("/reservations", {
    method: "GET",
    requiereAuth: true,
  });
}

export function getMyReservations() {
  return request("/reservations/my-reservations", {
    method: "GET",
    requiereAuth: true,
  });
}

export function createReservation(payload) {
  return request("/reservations", {
    method: "POST",
    requiereAuth: true,
    body: JSON.stringify(payload),
  });
}

export function cancelReservation(id) {
  return request(`/reservations/${id}/cancel`, {
    method: "PATCH",
    requiereAuth: true,
  });
}
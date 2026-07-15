import { request } from "./http";

export function getClassSchedules() {

  return request("/class-schedules", {
    method: "GET",
    requiereAuth: true,
  });

}

export function getClassSchedule(id) {

  return request(`/class-schedules/${id}`, {
    method: "GET",
    requiereAuth: true,
  });

}

export function createClassSchedule(payload) {

  return request("/class-schedules", {
    method: "POST",
    requiereAuth: true,
    body: JSON.stringify(payload),
  });

}

export function updateClassSchedule(id, payload) {

  return request(`/class-schedules/${id}`, {
    method: "PUT",
    requiereAuth: true,
    body: JSON.stringify(payload),
  });

}

export function deleteClassSchedule(id) {

  return request(`/class-schedules/${id}`, {
    method: "DELETE",
    requiereAuth: true,
  });

}
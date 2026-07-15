import { request } from "./http";

export async function getCoachDashboard() {
  return request("/coach/dashboard", {
    method: "GET",
    requiereAuth: true
  });
}

// Clases asignadas al coach
export async function getMyClasses() {
  return request("/coach/my-classes", {
    method: "GET",
    requiereAuth:true,
  });
}

// Horario del coach
export async function getMySchedules() {
  return request("/coach/my-schedules", {
    method: "GET",
    requiereAuth:true,
  });
}


// Salas asignadas al coach
export async function getMyRooms() {
  return request("/coach/my-rooms", {
    method: "GET",
    requiereAuth:true,
  });
}

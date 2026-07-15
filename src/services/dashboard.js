import { request } from "./http";


export function getDashboardAdmin(){

  return Promise.all([
    request("/users",{
      method:"GET",
      requiereAuth:true,
    }),

    request("/sports",{
      method:"GET",
      requiereAuth:true,
    }),

    request("/rooms",{
      method:"GET",
      requiereAuth:true,
    }),

    request("/sport-rooms",{
      method:"GET",
      requiereAuth:true,
    }),

    request("/class-schedules",{
      method:"GET",
      requiereAuth:true,
    }),

    request("/reservations",{
      method:"GET",
      requiereAuth:true,
    }),

  ]);

}
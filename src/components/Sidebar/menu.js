import {
  faHouse,
  faUser,
  faGear,
  faCalendarCheck,
  faPlus,
  faUsers,
  faDoorOpen,
  faDumbbell,
} from "@fortawesome/free-solid-svg-icons";

const menu = [
  {
    title: "General",
    roles: ["ADMIN", "COACH", "USER"],
    items: [
      {
        label: "Dashboard",
        path: "/dashboard",
        icon: faHouse,
      },
      {
        label: "Perfil",
        path: "/dashboard/profile",
        icon: faUser,
      },
      {
        label: "Configuración",
        path: "/dashboard/settings",
        icon: faGear,
      },
    ],
  },

  {
    title: "Reservas",
    roles: ["USER"],
    items: [
      {
        label: "Mis Reservas",
        path: "/dashboard/reservations",
        icon: faCalendarCheck,
      },
      {
        label: "Nueva Reserva",
        path: "/dashboard/reservations/new",
        icon: faPlus,
      },
    ],
  },

  {
    title: "Gestión",
    roles: ["ADMIN"],
    items: [
      {
        label: "Usuarios",
        path: "/dashboard/users",
        icon: faUsers,
      },
      {
        label: "Salas",
        path: "/dashboard/rooms",
        icon: faDoorOpen,
      },
      {
        label: "Deportes",
        path: "/dashboard/sports",
        icon: faDumbbell,
      },
    ],
  },
];

export default menu;
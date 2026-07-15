import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import {
  faHouse,
  faUser,
  faGear,
  faCalendarCheck,
  faPlus,
  faUsers,
  faDoorOpen,
  faDumbbell,
  faLink,
  faCalendarPlus,
  faCalendarDays,
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
        label: "Historial",
        path: "/dashboard/reservations-history",
        icon: faClockRotateLeft,
      },
      {
        label: "Clases disponibles",
        path: "/dashboard/classes",
        icon: faCalendarPlus,
      },
    ],
  },

  // COACH
  {
    title: "Actividades",
    roles: ["COACH"],
    items: [
      {
        label: "Mis Clases",
        path: "/dashboard/my-classes",
        icon: faDumbbell,
      },
      {
        label: "Mi Horario",
        path: "/dashboard/my-schedule",
        icon: faCalendarDays,
      },
    ]
  },

  // ADMIN
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
      {
        label: "Asignaciones",
        path: "/dashboard/sport-rooms",
        icon: faLink,
      },
      {
        label: "Horarios",
        path: "/dashboard/schedules",
        icon: faCalendarDays,
      },
    ],
  },
];

export default menu;
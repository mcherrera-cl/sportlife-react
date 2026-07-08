const menu = [

    {
        title: "General",

        roles: ["ADMIN", "COACH", "USER"],

        items: [

            {
                label: "Dashboard",
                path: "/dashboard"
            },

            {
                label: "Perfil",
                path: "/dashboard/profile"
            },
            {
                label: "Configuración",
                path: "/dashboard/settings"
            }


        ]
    },

    {
        title: "Reservas",

        roles: ["USER"],
        items: [
            {
                label: "Mis Reservas",
                path: "/dashboard/reservations"
            },
            {
                label: "Nueva Reserva",
                path: "/dashboard/reservations/new"
            }
        ]
    },
    {
        title: "Gestión",

        roles: ["ADMIN"],

        items: [

            {
                label: "Usuarios",
                path: "/dashboard/users"
            },

            {
                label: "Reportes",
                path: "/reports"
            }

        ]
    },

    {
        title: "Administración",

        roles: ["ADMIN"],

        items: [

            {
                label: "Roles",
                path: "/roles"
            },
        ]
    }

];

export default menu;
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
            }

        ]
    },

    {
        title: "Gestión",

        roles: ["ADMIN"],

        items: [

            {
                label: "Usuarios",
                path: "/users"
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

            {
                label: "Permisos",
                path: "/permissions"
            },

            {
                label: "Configuración",
                path: "/settings"
            }

        ]
    }

];

export default menu;
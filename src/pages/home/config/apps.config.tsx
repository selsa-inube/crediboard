import { MdVpnKey } from "react-icons/md";

const appsConfig = [
  {
    id: 1,
    label: "Board",
    description: "Gestiona los creditos",
    icon: <MdVpnKey />,
    crumbs: [
      {
        path: "/",
        label: "Inicio",
        id: "/",
        isActive: false,
      },
      {
        path: "/board",
        label: "Crediboard",
        id: "/board",
        isActive: true,
      },
    ],
    url: "/board",
  },
];

const navigationConfig = {
  title: "MENU",
  sections: {
    administrate: {
      links: {
        board: {
          id: "board",
          label: "Crediboard",
          icon: <MdVpnKey />,
          path: "/board",
        },
      },
    },
  },
};

const logoutConfig = {
  logoutPath: "/logout",
  logoutTitle: "Cerrar sesión",
};

const filterOptions = [
  { id: "1", label: "Opcion 1", disabled: false },
  { id: "2", label: "Opcion 2", disabled: false },
  { id: "3", label: "Opcion 3", disabled: false },
];

export { appsConfig, navigationConfig, logoutConfig, filterOptions };

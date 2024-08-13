import {
  MdKey,
  MdMeetingRoom,
  MdPhone,
  MdStarBorder,
  MdVpnKey,
} from "react-icons/md";

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

export const navigationMock = {
  title: "REGLAS",
  sections: {
    rules: {
      name: "Unidad de negocio",
      links: {
        Crediboart: {
          id: "Crediboart",
          label: "Crediboart",
          icon: <MdKey />,
          path: "/components/text",
        },
        Presente: {
          id: "Presente",
          label: "Presente",
          icon: <MdMeetingRoom />,
          path: "/components/textfield",
        },
        Cooservunal: {
          id: "Cooservunal",
          label: "Cooservunal",
          icon: <MdPhone />,
          path: "/components/textarea",
        },
        Corbanca: {
          id: "Corbanca",
          label: "Corbanca",
          icon: <MdStarBorder />,
          path: "/crm",
        },
        Fedecom: {
          id: "Fedecom",
          label: "Fedecom",
          icon: <MdStarBorder />,
          path: "/crm",
        },
      },
    },
  },
};

export { appsConfig, navigationConfig, logoutConfig };

import { MdWarningAmber } from "react-icons/md";
import { Icon, Tag } from "@inube/design-system";

export async function handleData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const entriesApprovals = [
        {
          id: "uno",
          usuarios: "Pedro Pablo Iregui Gerrero",
          decision: <Tag label="Aprobado" appearance="success" />,
        },
        {
          id: "dos",
          usuarios: "Carlos Alberto Combita",
          decision: <Tag label="Rechazado" appearance="error" />,
        },
        {
          id: "tres",
          usuarios: "Jaime Alberto Linares Guacaneme",
          decision: <Tag label="Aprovado" appearance="success" />,
          erro: "",
        },
        {
          id: "cuatro",
          usuarios: "Miguel Angel Fuentes",
          decision: <Tag label="Pendiente" appearance="warning" />,
        },
        {
          id: "cinco",
          usuarios: "Cesar Augusto Corredor",
          decision: <Tag label="Aprobado" appearance="success" />,
        },
        {
          id: "seis",
          usuarios: "Paula Andrea Betancurt",
          decision: <Tag label="Rechazado" appearance="error" />,
        },
        {
          id: "siete",
          usuarios: "Jaime Alejandro Vargas",
          decision: <Tag label="Pendiente" appearance="warning" />,
        },
        {
          id: "ocho",
          usuarios: "Viviana Amador Tejada",
          decision: <Tag label="Aprobado" appearance="success" />,
        },
      ];
      resolve(entriesApprovals);
    }, 2000);
  });
}

export const titlesApprovals = [
  {
    id: "usuarios",
    titleName: "Usuarios",
    priority: 1,
  },
  {
    id: "decision",
    titleName: "Decisión",
    priority: 2,
  },
];

export const entriesApprovals = [
  {
    id: "uno",
    usuarios: "Pedro Pablo Iregui Gerrero",
    decision: <Tag label="Aprobado" appearance="success" />,
    error: "",
  },
  {
    id: "dos",
    usuarios: "Carlos Alberto Combita",
    decision: <Tag label="Rechazado" appearance="error" />,
    error: (
      <Icon
        icon={<MdWarningAmber />}
        appearance="warning"
        spacing="compact"
        cursorHover
        size="24px"
      />
    ),
  },
  {
    id: "tres",
    usuarios: "Jaime Alberto Linares Guacaneme",
    decision: <Tag label="Aprovado" appearance="success" />,
    erro: "",
  },
  {
    id: "cuatro",
    usuarios: "Miguel Angel Fuentes",
    decision: <Tag label="Pendiente" appearance="warning" />,
    error: "",
  },
  {
    id: "cinco",
    usuarios: "Cesar Augusto Corredor",
    decision: <Tag label="Aprobado" appearance="success" />,
    error: "",
  },
  {
    id: "seis",
    usuarios: "Paula Andrea Betancurt",
    decision: <Tag label="Rechazado" appearance="error" />,
    error: (
      <Icon
        icon={<MdWarningAmber />}
        appearance="warning"
        spacing="compact"
        cursorHover
        size="24px"
      />
    ),
  },
  {
    id: "siete",
    usuarios: "Jaime Alejandro Vargas",
    decision: <Tag label="Pendiente" appearance="warning" />,
    error: "",
  },
  {
    id: "ocho",
    usuarios: "Viviana Amador Tejada",
    decision: <Tag label="Aprobado" appearance="success" />,
    error: "",
  },
];

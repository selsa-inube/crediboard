import { isValidElement } from "react";
import { MdNotificationsNone, MdWarningAmber } from "react-icons/md";
import { Icon, Tag } from "@inube/design-system";

import { IEntries } from "@components/data/TableBoard/types";

const handledata = (data: IEntries) => {
  console.log(data, "function that receives data");
};

export const titlesApprobals = [
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
  {
    id: "error",
    titleName: "Error",
    priority: 3,
  },
];

export const entriesApprobals = [
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

export const actionsApprovals = [
  {
    id: "notificaciones",
    actionName: "Notificar",
    content: (data: IEntries) => (
      <Icon
        icon={<MdNotificationsNone />}
        appearance="primary"
        spacing="compact"
        cursorHover
        size="24px"
        onClick={() => handledata(data)}
        disabled={
          isValidElement(data?.decision) &&
          data?.decision?.props?.label === "Pendiente"
        }
      />
    ),
  },
];

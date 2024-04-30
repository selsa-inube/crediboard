import { Tag } from "@inube/design-system";

export const titlesApprobals = [
  {
    id: "usuarios",
    titleName: "Usuarios",
    priority: 1,
  },
  {
    id: "desicion",
    titleName: "Desición",
    priority: 2,
  },
];

export const entriesApprobals = [
  {
    id: "uno",
    usuarios: "Pedro Pablo Iregui Gerrero",
    desicion: <Tag label="En tramite" appearance="warning" />,
  },
  {
    id: "dos",
    usuarios: "Carlos Alberto Combita",
    desicion: <Tag label="Aprobado" appearance="success" />,
  },
  {
    id: "tres",
    usuarios: "Jaime Alberto Linares Guacaneme",
    desicion: <Tag label="Rechazado" appearance="error" />,
  },
  {
    id: "cuatro",
    usuarios: "Miguel Angel Fuentes",
    desicion: <Tag label="En tramite" appearance="warning" />,
  },
  {
    id: "cinco",
    usuarios: "Cesar Augusto Corredor",
    desicion: <Tag label="Aprobado" appearance="success" />,
  },
  {
    id: "seis",
    usuarios: "Paula Andrea Betancurt",
    desicion: <Tag label="Rechazado" appearance="error" />,
  },
  {
    id: "siete",
    usuarios: "Jaime Alejandro Vargas",
    desicion: <Tag label="En tramite" appearance="warning" />,
  },
  {
    id: "ocho",
    usuarios: "Viviana Amador Tejada",
    desicion: <Tag label="Aprobado" appearance="success" />,
  },
];

export const actionsApprovals = [{}];

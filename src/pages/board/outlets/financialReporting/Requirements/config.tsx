import { Tag } from "@inube/design-system";

import { IEntries } from "@components/data/TableBoard/types";

export const dataButton = {
  title: "Agregar Requesito",
  onClick: () => console.log("Agregar"),
};

export const titlesRequirements = [
  [
    {
      id: "Validaciones del sistema",
      titleName: "Validaciones del sistema",
      priority: 1,
    },
    {
      id: "tag",
      titleName: "",
      priority: 2,
    },
  ],
  [
    {
      id: "Requisitos documentales",
      titleName: "Requisitos documentales",
      priority: 1,
    },
    {
      id: "tag",
      titleName: "",
      priority: 2,
    },
  ],
  [
    {
      id: "Validaciones humanas",
      titleName: "Validaciones humanas",
      priority: 1,
    },
    {
      id: "tag",
      titleName: "",
      priority: 2,
    },
  ],
];

export const entriesRequirements: IEntries[][] = [
  [
    {
      id: "uno",
      "Validaciones del sistema": "Que el asociado sea activo",
      tag: <Tag label="Cumple" appearance="success" />,
      date: "2024-02-03T00:00:00-05:00",
      details: "El asociado es activo desde el 2018",
    },
    {
      id: "dos",
      "Validaciones del sistema": "Que esté al día con las obligaciones",
      tag: <Tag label="Cumple" appearance="success" />,
      date: "2024-03-15T00:00:00-05:00",
      details: "No tiene deudas pendientes",
    },
    {
      id: "tres",
      "Validaciones del sistema": "Que esté al día con las obligaciones",
      tag: <Tag label="Cumple" appearance="success" />,
      date: "2024-04-01T00:00:00-05:00",
      details: "Cumple con todos los pagos hasta la fecha",
    },
    {
      id: "cuatro",
      "Validaciones del sistema": "Que tenga más de 30 años",
      tag: <Tag label="No Cumple" appearance="error" />,
      date: "2024-01-20T00:00:00-05:00",
      details: "El asociado tiene 28 años",
    },
  ],
  [
    {
      id: "cinco",
      "Requisitos documentales": "Imágenes de la Cédula de ciudadanía",
      tag: <Tag label="Cumple" appearance="success" />,
      date: "2024-02-28T00:00:00-05:00",
      details: "Imágenes claras y legibles",
    },
    {
      id: "seis",
      "Requisitos documentales": "Desprendible de pago",
      tag: <Tag label="Sin Evaluar" appearance="warning" />,
      date: "2024-03-10T00:00:00-05:00",
      details: "Pendiente de revisión",
    },
    {
      id: "siete",
      "Requisitos documentales": "Declaración de renta",
      tag: <Tag label="Sin Evaluar" appearance="warning" />,
      date: "2024-03-12T00:00:00-05:00",
      details: "Falta presentar declaración del último año",
    },
  ],
  [
    {
      id: "ocho",
      "Validaciones humanas": "Referencias laborales",
      tag: <Tag label="Cumple" appearance="success" />,
      date: "2024-01-15T00:00:00-05:00",
      details: "Referencias positivas de los últimos tres empleadores",
    },
    {
      id: "nueve",
      "Validaciones humanas": "Proponer un codeudor",
      tag: <Tag label="No Cumple" appearance="error" />,
      date: "2024-02-05T00:00:00-05:00",
      details: "No ha presentado un codeudor válido",
    },
  ],
];

export const dataRequirements = [
  {
    id: "tabla1",
    titlesRequirements: titlesRequirements[0],
    entriesRequirements: entriesRequirements[0],
  },
  {
    id: "tabla2",
    titlesRequirements: titlesRequirements[1],
    entriesRequirements: entriesRequirements[1],
  },
  {
    id: "tabla3",
    titlesRequirements: titlesRequirements[2],
    entriesRequirements: entriesRequirements[2],
  },
];

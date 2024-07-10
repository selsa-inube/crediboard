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
    },
    {
      id: "dos",
      "Validaciones del sistema": "Que este al días con las obligaciones",
      tag: <Tag label="Cumple" appearance="success" />,
    },
    {
      id: "tres",
      "Validaciones del sistema": "Que este al días con las obligaciones",
      tag: <Tag label="Cumple" appearance="success" />,
    },
    {
      id: "cuatro",
      "Validaciones del sistema": "Que tenga más de 30 años",
      tag: <Tag label="No Cumple" appearance="error" />,
    },
  ],
  [
    {
      id: "cinco",
      "Requisitos documentales": "Imagenes de la Cédula de ciudadanía",
      tag: <Tag label="Cumple" appearance="success" />,
    },
    {
      id: "seis",
      "Requisitos documentales": "Desprendible de pago",
      tag: <Tag label="Sin Evaluar" appearance="warning" />,
    },
    {
      id: "siete",
      "Requisitos documentales": "Declaración de renta",
      tag: <Tag label="Sin Evaluar" appearance="warning" />,
    },
  ],
  [
    {
      id: "ocho",
      "Validaciones humanas": "Referencias laborales",
      tag: <Tag label="Cumple" appearance="success" />,
    },
    {
      id: "nueve",
      "Validaciones humanas": "Proponer un codeudor",
      tag: <Tag label="No Cumple" appearance="error" />,
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

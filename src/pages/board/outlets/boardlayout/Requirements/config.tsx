import { isValidElement } from "react";
import { MdAddCircleOutline, MdOutlineCheckCircle } from "react-icons/md";
import { Icon, Stack, Tag } from "@inube/design-system";

import { IEntries } from "@components/data/TableBoard/types";

const receiveData = (data: IEntries) => {
  console.log(data, "function que recibe data");
};

export const titlesRequirements = [
  [
    {
      id: "uno",
      titleName: "Validaciones del sistema",
      priority: 1,
    },
  ],
  [
    {
      id: "dos",
      titleName: "Requisitos documentales",
      priority: 1,
    },
  ],
  [
    {
      id: "tres",
      titleName: "Validaciones humanas",
      priority: 1,
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

export const actionsRequirements = [
  [
    {
      id: "agregar",
      actionName: "Agregar",
      content: (data: IEntries) => (
        <Stack justifyContent="center">
          <Icon
            icon={<MdAddCircleOutline />}
            appearance="primary"
            onClick={() => receiveData(data)}
            spacing="compact"
            size="18px"
            cursorHover
          />
        </Stack>
      ),
    },
    {
      id: "aprobar",
      actionName: "Aprobar",
      content: (data: IEntries) => (
        <Stack justifyContent="center">
          <Icon
            icon={<MdOutlineCheckCircle />}
            appearance="primary"
            spacing="compact"
            cursorHover
            size="18px"
            onClick={() => receiveData(data)}
            disabled={
              isValidElement(data?.tag) &&
              data?.tag?.props?.label === "No Cumple"
            }
          />
        </Stack>
      ),
    },
  ],
];

export const dataRequirements = [
  {
    id: "tabla1",
    titlesRequirements: titlesRequirements[0],
    entriesRequirements: entriesRequirements[0],
    actionsRequirements: actionsRequirements[0],
  },
  {
    id: "tabla2",
    titlesRequirements: titlesRequirements[1],
    entriesRequirements: entriesRequirements[1],
    actionsRequirements: actionsRequirements[0],
  },
  {
    id: "tabla3",
    titlesRequirements: titlesRequirements[2],
    entriesRequirements: entriesRequirements[2],
    actionsRequirements: actionsRequirements[0],
  },
];

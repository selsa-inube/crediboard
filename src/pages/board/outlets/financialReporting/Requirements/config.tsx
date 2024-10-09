import { isValidElement } from "react";
import {
  MdAddCircleOutline,
  MdCheck,
  MdClose,
  MdOutlineCheckCircle,
  MdRemove,
} from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Tag } from "@inubekit/tag";

import { IEntries } from "@components/data/TableBoard/types";
import { CreditRequest } from "@services/types";

export const dataButton = {
  title: "Agregar Requisito",
  onClick: () => console.log("Agregar"),
};

const receiveData = (data: IEntries) => {
  console.log(data, "function que recibe data");
};

export const handleSuccess = (
  setFlagMessage: (message: { title: string; description: string; appearance: "success" | "danger" }) => void,
  setShowFlagMessage: (state: boolean) => void,
  setShowApprovalstModal: (state: boolean) => void
) => {
  setFlagMessage({
    title: "Exito",
    description: "La aprobación se ha completado correctamente.",
    appearance: "success",
  });
  setShowFlagMessage(true);
  setShowApprovalstModal(false);
};

export const handleError = (
  error: Error,
  setFlagMessage: (message: { title: string; description: string; appearance: "success" | "danger" }) => void,
  setShowFlagMessage: (state: boolean) => void,
  setShowApprovalstModal: (state: boolean) => void
) => {
  setFlagMessage({
    title: "Aprobación fallida",
    description: `No se ha podido realizar la aprobación: ${error.message}`,
    appearance: "danger",
  });
  setShowFlagMessage(true);
  setShowApprovalstModal(false);
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

export const infoItems = [
  { icon: <MdAddCircleOutline />, text: "Adjuntar", appearance: "help" },
  {
    icon: <MdOutlineCheckCircle />,
    text: "Forzar Aprobación",
    appearance: "help",
  },
];

export const actionsRequirements = [
  [
    {
      id: "agregar",
      content: (data: IEntries) => (
        <Stack justifyContent="center">
          <Icon
            icon={<MdAddCircleOutline />}
            appearance="primary"
            onClick={() => receiveData(data)}
            spacing="narrow"
            size="22px"
            cursorHover
          />
        </Stack>
      ),
    },
    {
      id: "aprobar",
      content: (data: IEntries) => (
        <Stack justifyContent="center">
          <Icon
            icon={<MdOutlineCheckCircle />}
            appearance="primary"
            spacing="narrow"
            cursorHover
            size="22px"
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

const iconActionsMobile = (tag: string) => {
  if (tag === "Aprobado") {
    return <MdCheck />;
  } else if (tag === "Pendiente") {
    return <MdRemove />;
  } else {
    return <MdClose />;
  }
};

interface TagProps {
  appearance?: string;
  label?: string;
}

interface TagElement {
  props: TagProps;
}

const isValidTagElement = (element: unknown): element is TagElement => {
  return isValidElement(element) && element.props !== undefined;
};

const actionsMobile = [
  {
    id: "tags",
    actionName: "",
    content: (data: IEntries) => (
      <Icon
        icon={
          isValidElement(data?.tag) &&
          iconActionsMobile(data?.tag?.props?.label)
        }
        appearance={
          isValidTagElement(data?.tag)
            ? data?.tag?.props?.appearance
            : undefined
        }
        cursorHover
        variant="filled"
        shape="circle"
      />
    ),
  },
  {
    id: "agregar",
    content: (data: IEntries) => (
      <Stack justifyContent="center">
        <Icon
          icon={<MdAddCircleOutline />}
          appearance="primary"
          onClick={() => receiveData(data)}
          spacing="narrow"
          variant="empty"
          size="22px"
          cursorHover
        />
      </Stack>
    ),
  },
  {
    id: "aprobar",
    content: (data: IEntries) => (
      <Stack justifyContent="center">
        <Icon
          icon={<MdOutlineCheckCircle />}
          appearance="primary"
          spacing="narrow"
          variant="empty"
          cursorHover
          size="22px"
          onClick={() => receiveData(data)}
          disabled={
            isValidElement(data?.tag) && data?.tag?.props?.label === "No Cumple"
          }
        />
      </Stack>
    ),
  },
];

const generateTag = (value: string): JSX.Element => {
  if (value === "Y") {
    return <Tag label="Cumple" appearance="success" weight="strong" />;
  } else if (value === "N") {
    return <Tag label="No Cumple" appearance="danger" weight="strong" />;
  } else {
    return <Tag label="Sin Evaluar" appearance="warning" weight="strong" />;
  }
};

export const maperEntries = (data: CreditRequest): IEntries[][] => {
  const result: IEntries[][] = [];

  const systemValidations: IEntries[] = Object.entries(
    data.system_validations
  ).map(([key, value], index) => ({
    id: `sistema-${index + 1}`,
    "Validaciones del sistema": key,
    tag: generateTag(value),
  }));

  const documentaryRequirements: IEntries[] = Object.entries(
    data.documentary_requirements
  ).map(([key, value], index) => ({
    id: `documento-${index + 1}`,
    "Requisitos documentales": key,
    tag: generateTag(value),
  }));

  const humanValidations: IEntries[] = Object.entries(
    data.human_validations
  ).map(([key, value], index) => ({
    id: `humano-${index + 1}`,
    "Validaciones humanas": key,
    tag: generateTag(value),
  }));

  result.push(systemValidations, documentaryRequirements, humanValidations);

  return result;
};

export const maperDataRequirements = (processedEntries: IEntries[][]) => {
  return [
    {
      id: "tabla1",
      titlesRequirements: titlesRequirements[0],
      entriesRequirements: processedEntries[0],
      actionsMovile: actionsMobile,
    },
    {
      id: "tabla2",
      titlesRequirements: titlesRequirements[1],
      entriesRequirements: processedEntries[1],
      actionsMovile: actionsMobile,
    },
    {
      id: "tabla3",
      titlesRequirements: titlesRequirements[2],
      entriesRequirements: processedEntries[2],
      actionsMovile: actionsMobile,
    },
  ];
};

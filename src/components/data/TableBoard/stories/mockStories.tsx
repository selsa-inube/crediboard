import { isValidElement } from "react";
import {
  MdAddCircleOutline,
  MdCheck,
  MdClose,
  MdOutlineCheckCircle,
  MdRemove,
} from "react-icons/md";

import { Icon, Stack} from "@inube/design-system";
import {Tag} from "@inubekit/tag";

import { IAction, IEntries } from "../types";

const appearanceIcon = (tag: string) => {
  if (tag === "Cumple") {
    return "success";
  } else if (tag === "Sin Validar") {
    return "warning";
  } else {
    return "error";
  }
};

export const mockData: IEntries[] = [
  {
    id: "1",
    "Validaciones del sistema":
      "Que el asociado sea activo y tiene mas de 5 años de antiguedad",
    tag: (
      <Stack padding="s0 s100 s0 s0">
        <Tag label="Cumple" appearance="success"  weight="strong"/>
      </Stack>
    ),
  },
  {
    id: "2",
    "Validaciones del sistema": "Que este al días con las obligaciones",
    tag: (
      <Stack padding="s0 s100 s0 s0">
        <Tag label="No Cumple" appearance="warning"  weight="strong"/>
      </Stack>
    ),
  },
  {
    id: "3",
    "Validaciones del sistema": "Que tenga mas de 30 años",
    tag: (
      <Stack padding="s0 s100 s0 s0">
        <Tag label="Sin Validar" appearance="danger"  weight="strong"/>
      </Stack>
    ),
  },
  {
    id: "4",
    "Validaciones del sistema": "Que tenga mas de 30 años",
    tag: (
      <Stack padding="s0 s100 s0 s0">
        <Tag label="Cumple" appearance="success"  weight="strong"/>
      </Stack>
    ),
  },
];

export const titlesMock = [
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
];

const receiveData = (data: IEntries) => {
  console.log(data);
};

export const actionsMock: IAction[] = [
  {
    id: "agregar",
    actionName: "Agregar",
    content: (data: IEntries) => (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Icon
          icon={<MdAddCircleOutline />}
          appearance={appearanceIcon(
            isValidElement(data?.tag)
              ? data?.tag?.props?.children?.props?.label
              : "primary"
          )}
          onClick={() => receiveData(data)}
          spacing="compact"
          size="24px"
          cursorHover
        />
      </div>
    ),
  },
  {
    id: "aprobar",
    actionName: "Aprobar",
    content: (data: IEntries) => (
      <Icon
        icon={<MdOutlineCheckCircle />}
        appearance="primary"
        spacing="compact"
        cursorHover
        size="24px"
        onClick={() => receiveData(data)}
        disabled={
          isValidElement(data?.tag) &&
          data?.tag?.props?.children?.props?.label === "Sin Validar"
        }
      />
    ),
  },
];

const resiveDataMobile = (data: IEntries) => {
  console.log(data, "function que recibe data");
};

const iconActionsMobile = (tag: string) => {
  if (tag === "Cumple") {
    return <MdCheck />;
  } else if (tag === "Sin Validar") {
    return <MdRemove />;
  } else {
    return <MdClose />;
  }
};

interface TagProps {
  children?: {
    props: {
      label?: string;
      appearance?: string;
    };
  };
}

interface TagElement {
  props: TagProps;
}

const isValidTagElement = (element: unknown): element is TagElement => {
  return isValidElement(element) && element.props !== undefined;
};

export const actionMobileMock: IAction[] = [
  {
    id: "tags",
    actionName: "Aprobar",
    content: (data) => (
      <Icon
        icon={
          isValidTagElement(data?.tag) &&
          iconActionsMobile(data?.tag?.props?.children?.props?.label)
        }
        appearance={
          isValidTagElement(data?.tag) &&
          data?.tag?.props?.children?.props?.appearance
        }
        spacing="compact"
        cursorHover
        variant="filled"
        shape="circle"
      />
    ),
  },
  {
    id: "agregar",
    actionName: "Agregar",
    content: (data: IEntries) => (
      <Icon
        icon={<MdAddCircleOutline />}
        appearance="primary"
        spacing="compact"
        size="24px"
        cursorHover
        onClick={() => resiveDataMobile(data)}
      />
    ),
  },
  {
    id: "aprobar",
    actionName: "Aprobar",
    content: () => (
      <Icon
        icon={<MdOutlineCheckCircle />}
        appearance="primary"
        spacing="compact"
        cursorHover
        size="24px"
      />
    ),
  },
];

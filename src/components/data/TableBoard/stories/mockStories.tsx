import { isValidElement } from "react";
import { MdAddCircleOutline, MdOutlineCheckCircle } from "react-icons/md";
import { Icon, Stack, Tag } from "@inube/design-system";

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
        <Tag label="Cumple" appearance="success" />
      </Stack>
    ),
  },
  {
    id: "2",
    "Validaciones del sistema": "Que este al días con las obligaciones",
    tag: (
      <Stack padding="s0 s100 s0 s0">
        <Tag label="Sin Validar" appearance="warning" />
      </Stack>
    ),
  },
  {
    id: "3",
    "Validaciones del sistema": "Que tenga mas de 30 años",
    tag: (
      <Stack padding="s0 s100 s0 s0">
        <Tag label="Sin Validar" appearance="error" />
      </Stack>
    ),
  },
  {
    id: "4",
    "Validaciones del sistema": "Que tenga mas de 30 años",
    tag: (
      <Stack padding="s0 s100 s0 s0">
        <Tag label="Cumple" appearance="success" />
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

const resiveData = (data: IEntries) => {
  console.log(data, "function que recibe data");
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
          onClick={() => resiveData(data)}
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
        onClick={() => resiveData(data)}
        disabled={
          isValidElement(data?.tag) &&
          data?.tag?.props?.children?.props?.label === "Sin Validar"
        }
      />
    ),
  },
];

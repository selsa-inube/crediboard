import { MdAddCircleOutline, MdOutlineCheckCircle } from "react-icons/md";
import { Icon, Tag } from "@inube/design-system";

import { IAction, IEntries } from "../types";

export const mockData: IEntries[] = [
  {
    id: "1",
    "validaciones del sistema": "Que el asociado sea activo",
    tag: <Tag label="Cumple" appearance="success" />,
  },
  {
    id: "2",
    "validaciones del sistema": "Que este al días con las obligaciones",
    tag: <Tag label="No Cumple" appearance="error" />,
  },
  {
    id: "3",
    "validaciones del sistema": "Que tenga mas de 30 años",
    tag: <Tag label="Sin Validar" appearance="warning" />,
  },
];

export const titlesMock = [
  {
    id: "validaciones del sistema",
    titleName: "Validaciones del sistema",
    priority: 1,
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
          appearance="primary"
          onClick={() => resiveData(data)}
          spacing="compact"
          size="18px"
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
        size="18px"
        onClick={() => resiveData(data)}
      />
    ),
  },
];

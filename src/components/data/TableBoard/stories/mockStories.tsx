import { MdAddCircleOutline, MdOutlineCheckCircle } from "react-icons/md";
import { Icon, Tag } from "@inube/design-system";

import { IAction, IEntries } from "../types";

export const mockData: IEntries[] = [
  {
    id: "1",
    "Validaciones del sistema": "Que el asociado sea activo",
    tag: <Tag label="Cumple" appearance="success" />,
    tag2: "dkjfvsvjml dfjvdklvdklv sv dvdklvjd;lv",
  },
  {
    id: "2",
    "Validaciones del sistema": "Que este al días con las obligaciones",
    tag: <Tag label="No Cumple" appearance="error" />,
    tag2: "dkjfvsvjml dfjvdklvdklv sv dvdklvjd;lv",
  },
  {
    id: "3",
    "Validaciones del sistema": "Que tenga mas de 30 años",
    tag: <Tag label="Sin Validar" appearance="warning" />,
    tag2: "<csdkjhscsdlcsklcsjcsjclksjcklsjcklsjcskljcksjcklsjc",
  },
  {
    id: "4",
    "Validaciones del sistema": "Que tenga mas de 30 años",
    tag: <Tag label="Sin Validar" appearance="warning" />,
    tag2: "kjcslkjcklsdjcklsjdclkdsjclsjcsjcsl",
  },
];

export const titlesMock = [
  {
    id: "Validaciones del sistema",
    titleName: "Validaciones del sistema",
    priority: 1,
  },
  {
    id: "tag2",
    titleName: "",
    priority: 2,
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

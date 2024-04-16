import { MdAddCircleOutline, MdOutlineCheckCircle } from "react-icons/md";
import { Icon } from "@inube/design-system";

import { IAction, IEntries } from "../types";

export const mockData: IEntries[] = [
  {
    section: {
      title: "Section 1",
      priority: 1,
      requirements: [
        {
          id: "1",
          description: "Requirement 1",
          tag: "Cumple",
        },
        {
          id: "2",
          description: "Requirement 2",
          tag: "No Cumple",
        },
      ],
      validations: true,
    },
  },

  {
    section: {
      title: "Section 2",
      priority: 2,
      requirements: [
        {
          id: "3",
          description: "Requirement 3",
          tag: "Sin Evaluar",
        },
        {
          id: "4",
          description: "Requirement 4",
          tag: "No Cumple",
        },
      ],
      validations: true,
    },
  },
  {
    section: {
      title: "Section 3",
      priority: 3,
      requirements: [
        {
          id: "5",
          description: "Requirement 5",
          tag: "Cumple",
        },
        {
          id: "6",
          description: "Requirement 6",
        },
      ],
      validations: true,
    },
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
      <Icon
        icon={<MdAddCircleOutline />}
        appearance="primary"
        onClick={() => resiveData(data)}
      />
    ),
  },
  {
    id: "aprobar",
    actionName: "Aprobar",
    content: (data: IEntries) => (
      <Icon
        icon={<MdOutlineCheckCircle />}
        appearance="primary"
        onClick={() => resiveData(data)}
      />
    ),
  },
];

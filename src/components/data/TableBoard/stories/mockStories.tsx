import { IEntries } from "../types";

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
];

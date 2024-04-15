import type { Meta, StoryObj } from "@storybook/react";
import { IEntries, TableBoard } from "..";

const mockData: IEntries[] = [
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

type Story = StoryObj<typeof TableBoard>;

const meta: Meta<typeof TableBoard> = {
  title: "components/data/VisualVersion",
  component: TableBoard,
};

export const Default: Story = {
  args: {
    id: "1",
    entries: mockData,
    withTitles: false,
  },
};
export default meta;

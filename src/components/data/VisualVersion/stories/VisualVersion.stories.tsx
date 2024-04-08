import type { Meta, StoryObj } from "@storybook/react";
import { VisualVersion } from "..";

const mockData = [
  {
    section: {
      title: "Section 1",
      requirements: [
        {
          id: "1",
          description: "Requirement 1",
          tag: "1",
        },
        {
          id: "2",
          description: "Requirement 2",
          tag: "2",
        },
      ],
      validations: true,
    },
  },

  {
    section: {
      title: "Section 2",
      requirements: [
        {
          id: "3",
          description: "Requirement 3",
          tag: "3",
        },
        {
          id: "4",
          description: "Requirement 4",
          tag: "4",
        },
      ],
      validations: false,
    },
  },
];

const meta: Meta<typeof VisualVersion> = {
  component: VisualVersion,
};

type Story = StoryObj<typeof VisualVersion>;

export const Default: Story = {
  args: {
    id: "1",
    entries: mockData,
  },
};
export default meta;

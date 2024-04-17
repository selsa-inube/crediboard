import type { Meta, StoryObj } from "@storybook/react";

import { actionsMock, mockData, titlesMock } from "./mockStories";
import { TableBoard } from "..";

type Story = StoryObj<typeof TableBoard>;

const meta: Meta<typeof TableBoard> = {
  title: "components/data/TableBoard",
  component: TableBoard,
};

export const Default: Story = {
  args: {
    id: "1",
    entries: mockData,
    titles: titlesMock,
    actions: actionsMock,
    borderTable: true,
  },
};
export default meta;

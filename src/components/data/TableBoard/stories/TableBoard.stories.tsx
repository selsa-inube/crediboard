import type { Meta, StoryObj } from "@storybook/react";

import { mockData } from "./mockStories";
import { TableBoard } from "..";

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
    colspan: "2",
  },
};
export default meta;

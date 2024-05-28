import type { Meta, StoryObj } from "@storybook/react";

import { actionsMock, mockData, titlesMock } from "./mockStories";
import { TableBoard } from "..";
import { props } from "./props";

type Story = StoryObj<typeof TableBoard>;

const meta: Meta<typeof TableBoard> = {
  title: "components/data/TableBoard",
  component: TableBoard,
  argTypes: props,
};

export const Default: Story = {
  args: {
    id: "1",
    entries: mockData,
    titles: titlesMock,
    actions: actionsMock,
    borderTable: true,
    efectzebra: true,
  },
};
export default meta;

import type { Meta, StoryObj } from "@storybook/react";

import { parameters, props } from "./props";
import { OptionItem } from "..";

type Story = StoryObj<typeof OptionItem>;

const meta: Meta<typeof OptionItem> = {
  title: "components/inputs/SelectCheck/OptionItem",
  component: OptionItem,
  parameters,
  argTypes: props,
};

export const Default: Story = {
  args: {
    id: "1",
    label: "Item 1",
  },
};

export default meta;

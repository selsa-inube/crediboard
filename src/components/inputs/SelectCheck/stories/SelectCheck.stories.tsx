import type { Meta, StoryObj } from "@storybook/react";

import { ControllerSelectCheck } from "./constroller";
import { parameters, props } from "./props";
import { SelectCheck } from "..";

const options = [
  { id: "uno", label: "Option 1", checked: false },
  { id: "dos", label: "Option 2", checked: false },
  { id: "tres", label: "Option 3", checked: true },
];

type Story = StoryObj<typeof SelectCheck>;

const meta: Meta<typeof SelectCheck> = {
  title: "components/inputs/SelectCheck",
  component: ControllerSelectCheck,
  parameters,
  argTypes: props,
};

export const Default: Story = {
  args: {
    name: "SelectCheck",
    id: "SelectCheck",
    placeholder: "SelectCheck",
    disabled: false,
    readonly: false,
    required: false,
    status: "pending",
    message: "SelectCheck",
    fullwidth: false,
    options: options,
    onBlur: () => {},
    onFocus: () => {},
    onClick: () => {},
  },
};

export default meta;

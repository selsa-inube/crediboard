import { Meta, StoryObj } from "@storybook/react";

import { ContainerSections } from ".";

type Story = StoryObj<typeof ContainerSections>;

const meta: Meta<typeof ContainerSections> = {
  title: "layouts/ContainerSections",
  component: ContainerSections,
};

export const Default: Story = {
  args: {},
};

export default meta;

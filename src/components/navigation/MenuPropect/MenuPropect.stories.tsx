import { MdAndroid } from "react-icons/md";
import { BrowserRouter } from "react-router-dom";
import { Meta, StoryFn, StoryObj } from "@storybook/react";

import { MenuPropect, MenuPropectProps } from ".";

const meta: Meta<typeof MenuPropect> = {
  title: "components/navigation/MenuPropect",
  component: MenuPropect,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

type Story = StoryObj<typeof MenuPropect>;

export const Default: Story = (args: MenuPropectProps) => <MenuPropect {...args} />;
Default.args = {
  options: [
    {
      title: "Option 1",
      onClik: () => console.log("Option 1"),
      icon: <MdAndroid />,
    },
    {
      title: "Option 2",
      onClik: () => console.log("Option 2"),
      icon: <MdAndroid />,
    },
  ],
  onMouseLeave: () => console.log("Mouse leave"),
};

export default meta;

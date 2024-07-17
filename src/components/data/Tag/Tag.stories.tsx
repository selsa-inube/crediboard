import { Meta, StoryObj } from "@storybook/react";

import { appearances } from "./types";
import { Tag } from ".";

type Story = StoryObj<typeof Tag>;

const meta: Meta<typeof Tag> = {
  component: Tag,
  title: "components/data/Tag",
  argTypes: {
    appearance: {
      control: {
        type: "select",
        options: [
          "primary",
          "success",
          "danger",
          "warning",
          "help",
          "dark",
          "gray",
          "light",
        ],
      },
      description: "appearance of the component",
    },
    label: {
      control: {
        options: appearances,
        type: "select",
      },
      description: "label of the component",
    },
  },
};

export const Default: Story = {
  args: {
    appearance: "primary",
    label: "En tramite",
  },
};

export default meta;

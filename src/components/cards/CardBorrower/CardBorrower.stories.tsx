import { Meta, StoryObj } from "@storybook/react";
import { CardBorrower } from ".";

type Story = StoryObj<typeof CardBorrower>;

const cardBorrower: Meta<typeof CardBorrower> = {
  component: CardBorrower,
  title: "components/cards/CardBorrower",
  argTypes: {
    label: {
      control: {
        type: "text",
      },
      description: "label",
    },
    placeHolder: {
      control: {
        type: "text",
      },
      description: "placeholder",
    },
    data: {
      control: {
        type: "text",
      },
      description: "data",
    },
  },
};

export const Default: Story = {
  args: {
    label: "Correo electrónico",
    placeHolder: "daniel.rodriguez98@hotmail.com",
    data: "Cédula de ciudadanía",
  },
};

export default cardBorrower;

import { Meta, StoryObj } from "@storybook/react";
import { CreditLimitCard } from "./index";

type Story = StoryObj<typeof CreditLimitCard>;

const creditLimitCard: Meta<typeof CreditLimitCard> = {
  component: CreditLimitCard,
  title: "components/cards/CreditLimitCard",
  argTypes: {
    creditLine: {
      control: {
        type: "number",
      },
      description: "It is the value indicated in the line of credit.",
    },
    creditLineTxt: {
      control: {
        type: "text",
      },
      description: "It is the text indicated in the line of credit.",
    },
  },
};

export const Default: Story = {
  args: {
    creditLine: 20000000,
    creditLineTxt: "crédito vacacional.",
  },
};

export default creditLimitCard;

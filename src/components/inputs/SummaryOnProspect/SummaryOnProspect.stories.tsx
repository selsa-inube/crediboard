import { Meta, StoryObj } from "@storybook/react";
import ObligationCard, { ObligationCardProps } from "./index";

export default {
  title: "Components/inputs /ObligationCard",
  component: ObligationCard,
} as Meta<typeof ObligationCard>;

const Template: StoryObj<ObligationCardProps> = {
  render: (args) => <ObligationCard {...args} />,
};

export const Default = {
  ...Template,
  args: {
    items: [
      { title: "Obligaciones recogidas", amount: "$5.000.000" },
      { title: "Obligaciones recogidas", amount: "$5.000.000" },
      { title: "Obligaciones recogidas", amount: "$5.000.000" },
      { title: "Otra obligación", amount: "$2.000.000" },
    ],
    showIcon: true,
  },
};

export const WithoutIcon = {
  ...Template,
  args: {
    items: [
      { title: "Obligaciones recogidas", amount: "$5.000.000" },
      { title: "Otra obligación", amount: "$2.000.000" },
    ],
    showIcon: false,
  },
};

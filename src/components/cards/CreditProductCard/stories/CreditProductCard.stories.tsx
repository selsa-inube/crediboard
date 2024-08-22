import { StoryFn, Meta } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { action } from "@storybook/addon-actions";

import { CreditProductCard, CreditProductCardProps } from "..";
import { props } from "./props";

const story: Meta<typeof CreditProductCard> = {
  component: CreditProductCard,
  argTypes: props,
  title: "components/cards/CreditProductCard",
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export const Default: StoryFn<CreditProductCardProps> = (args) => (
  <CreditProductCard {...args} />
);

Default.args = {
  title: "Crédito Vacacional",
  paymentMethod: "Nómina mensual éxito Bancolombia",
  loanAmount: 10000000,
  interestRate: 6.5,
  termMonths: 48,
  periodicFee: 10000,
  paymentCycle: "Quincenal",
  onEdit: action("onEdit"),
  onDelete: action("onDelete"),
};

export default story;

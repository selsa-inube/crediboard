import { StoryFn, Meta } from "@storybook/react";

import { SummaryCard, ISummaryCardProps } from "..";

import { props } from "./props";

const story: Meta<typeof SummaryCard> = {
  component: SummaryCard,
  argTypes: props,
  title: "components/cards/SummaryCard",
};

export const Default: StoryFn<ISummaryCardProps> = (args) => (
  <SummaryCard {...args} />
);

Default.args = {
  rad: 100000012,
  date: "Septiembre 30/23",
  name: "Juan Sebastian Moralez García",
  destination: "Educación de Postgrado a menos de tres meses",
  value: 10000000,
  toDo: "Aceptación por parte del cliente de la propuesta",
  isPinned: true,
  hasMessage: true,
};

export default story;

import { StoryFn, Meta } from "@storybook/react";

import { SummaryCard } from "@components/cards/SummaryCard";

import { BoardSection, IBoardSectionProps } from "..";
import { props } from "./props";

const story: Meta<typeof BoardSection> = {
  component: BoardSection,
  argTypes: props,
  title: "layouts/BoardSection",
};

export const Default: StoryFn<IBoardSectionProps> = (args) => (
  <BoardSection {...args} />
);

const SummaryCardInfo = {
  rad: 100000012,
  date: "Septiembre 30/23",
  name: "Juan Sebastian Moralez García",
  destination: "Educación de Postgrado a menos de tres meses",
  value: 10000000,
  toDo: "Aceptación por parte del cliente de la propuesta",
  isPinned: true,
  hasMessage: true,
};

const EmptyCards = () => (
  <>
    <SummaryCard {...SummaryCardInfo}></SummaryCard>
    <SummaryCard {...SummaryCardInfo}></SummaryCard>
    <SummaryCard {...SummaryCardInfo}></SummaryCard>
    <SummaryCard {...SummaryCardInfo}></SummaryCard>
    <SummaryCard {...SummaryCardInfo}></SummaryCard>
  </>
);

Default.args = {
  sectionTitle: "BoardSectionTitle",
  numberActiveCards: 5,
  children: <EmptyCards />,
  sectionBackground: "gray",
};

export default story;

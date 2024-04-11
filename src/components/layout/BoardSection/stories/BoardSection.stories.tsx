import { Text } from "@inube/design-system";
import { StoryFn, Meta } from "@storybook/react";

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

const EmptyCards = () => (
  <>
    <Text type="title" appearance="gray">
      SummaryCard
    </Text>
    <Text type="title" appearance="gray">
      SummaryCard
    </Text>
    <Text type="title" appearance="gray">
      SummaryCard
    </Text>
    <Text type="title" appearance="gray">
      SummaryCard
    </Text>
  </>
);

Default.args = {
  sectionTitle: "BoardSectionTitle",
  numberActiveCards: 4,
  children: <EmptyCards />,
  sectionBackground: "gray",
};

export default story;

import { StoryFn, Meta } from "@storybook/react";

import { mockRequests } from "@mocks/requests/requests.mock";

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

export const Horizontal: StoryFn<IBoardSectionProps> = (args) => (
  <BoardSection {...args} />
);

Default.args = {
  sectionTitle: "BoardSectionTitle",
  sectionBackground: "gray",
  orientation: "vertical",
  sectionInformation: mockRequests,
};

Horizontal.args = {
  ...Default.args,
  orientation: "horizontal",
};

export default story;

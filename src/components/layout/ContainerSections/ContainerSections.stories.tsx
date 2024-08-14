import { StoryFn, Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

import { ContainerSections } from ".";
import { StockTray } from "./Stocktray";

type Story = StoryObj<typeof ContainerSections>;

const meta: Meta<typeof ContainerSections> = {
  title: "components/layouts/ContainerSections",
  component: ContainerSections,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export const Default: Story = {
  args: {
    stocktray: <StockTray navigation={() => console.log("previous route")} />,
  },
};

export default meta;

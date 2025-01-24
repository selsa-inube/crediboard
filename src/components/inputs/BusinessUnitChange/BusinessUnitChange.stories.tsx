import { BrowserRouter } from "react-router-dom";
import { Meta, StoryObj } from "@storybook/react";

import { clientsDataMock } from "@mocks/login/clients.mock";

import { BusinessUnitChange } from ".";

type Story = StoryObj<typeof BusinessUnitChange>;

const businessUnitChange: Meta<typeof BusinessUnitChange> = {
  component: BusinessUnitChange,
  title: "components/inputs/BusinessUnitChange",
  argTypes: {
    clients: {
      control: {
        type: "object",
      },
      description: "entities",
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export const Default: Story = {
  args: {
    clients: clientsDataMock,
  },
};

export default businessUnitChange;
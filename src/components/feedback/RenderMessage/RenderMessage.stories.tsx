import { Meta, StoryObj } from "@storybook/react";
import { FlagProvider } from "@inubekit/flag";
import { MdThumbUpOffAlt } from "react-icons/md";

import { RenderMessage } from "./index";

type Story = StoryObj<typeof RenderMessage>;

const renderMessage: Meta<typeof RenderMessage> = {
  component: RenderMessage,
  title: "components/feedback/RenderMessage",
  argTypes: {
    message: {
      control: {
        type: "text",
      },
      description: "Title of the component.",
    },
  },
  decorators: [
    (Story) => (
      <FlagProvider>
        <Story />
      </FlagProvider>
    ),
  ],
};

export const Default: Story = {
  args: {
    message: {
      visible: true,
      data: {
        icon: <MdThumbUpOffAlt />,
        title: "Actualizacion de paleta exitosa",
        description: `La paleta de colores ha sido actualizada con exito`,
        appearance: "success",
      },
    },
  },
};

export default renderMessage;

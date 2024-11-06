import { MdThumbUpOffAlt } from "react-icons/md";
import { StoryFn } from "@storybook/react";

import { IRenderMessageProps, RenderMessage } from ".";

const story = {
  component: [RenderMessage],
  title: "components/feedback/RenderMessage",
  decorators: [(Story: StoryFn) => <Story />],
};

export const Default = (args: IRenderMessageProps) => (
  <RenderMessage {...args} />
);

Default.args = {
  message: {
    visible: true,
    data: {
      id: 1,
      icon: <MdThumbUpOffAlt/>,
      title: "Actualizacion de paleta exitosa",
      description: `La paleta de colores ha sido actualizada con exito`,
      appearance: "success",
    },
  },
  handleCloseMessage: () => {},
  handleReset: () => {},
};
export default story;

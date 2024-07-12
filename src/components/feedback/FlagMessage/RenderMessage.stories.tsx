import { StoryFn } from "@storybook/react";
import { IFlagMessageProps, FlagMessage } from ".";
import { MdThumbUpOffAlt } from "react-icons/md";
import { EAppearance } from "./types";


const story = {
  component: [FlagMessage],
  title: "feedback/FlagMessage",
  decorators: [(Story: StoryFn) => <Story />],
};

export const Default = (args: IFlagMessageProps) => (
  <FlagMessage {...args} />
);

Default.args = {
  message: {
    visible: true,
    data: {
      id: 1,
      icon: <MdThumbUpOffAlt size={18} />,
      title: "Actualizacion de paleta exitosa",
      description: `La paleta de colores ha sido actualizada con exito`,
      appearance: EAppearance.SUCCESS,
    },
  },
  handleCloseMessage: () => {},
  handleReset: () => {},
};
export default story;

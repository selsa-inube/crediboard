import { Meta, StoryObj } from "@storybook/react";
import { InfoModal, InfoItem } from "@components/modals/InfoModal";
import { MdClose, MdOutlineSend, MdOutlineRemoveRedEye } from "react-icons/md";

const meta: Meta<typeof InfoModal> = {
  title: "components/modals/InfoModal",
  component: InfoModal,
};

const Default: StoryObj<{ items: InfoItem[] }> = {
  render: (args) => <InfoModal {...args} />,
  args: {
    items: [
      { icon: <MdClose />, text: "No Cumple", appearance: "danger", size: "20px", shape: "circle", variant: "filled" },
      { icon: <MdOutlineSend />, text: "Reenviar", appearance: "primary", size: "24px" },
      { icon: <MdOutlineRemoveRedEye />, text: "Ver Imagen", appearance: "primary", size: "24px" },
    ],
  },
};

export { Default };
export default meta;



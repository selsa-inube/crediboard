// src/components/modals/NotificationModal.stories.tsx

import { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { NotificationModal, NotificationModalProps } from "./index";
import { Button } from "@inube/design-system";

export default {
  title: "Components/modals/NotificationModal",
  component: NotificationModal,
  argTypes: {
    title: { control: "text" },
    buttonText: { control: "text" },
    confirmationText: { control: "text" },
    onSubmit: { action: "submitted" },
    onCloseModal: { action: "closed" },
  },
} as Meta;

const Template: StoryFn<NotificationModalProps> = (args: NotificationModalProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Button onClick={handleShowModal}>Open Modal</Button>
      {showModal && <NotificationModal {...args} onCloseModal={handleShowModal} />}
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: "Notificación",
  buttonText: "Enviar",
  confirmationText:
    "¿Está seguro que desea enviar esta solicitud para aprobación? La necesidad de evaluar esta solicitud es importante.",
  portalId: "portal",
};

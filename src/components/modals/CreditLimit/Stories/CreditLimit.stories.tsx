import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Button, Text } from "@inube/design-system";

import { IListModalProps, ListModal } from "../index";
import { parameters, props } from "./props";

const meta: Meta<typeof ListModal> = {
  title: "components/modals/CreditLimit",
  component: ListModal,
  parameters,
  argTypes: props,
};

type Story = StoryObj<typeof ListModal>;
export const Default: Story = (args: IListModalProps) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button onClick={() => setShowModal(true)}>Modal List</Button>
      {showModal && (
        <ListModal {...args} handleClose={() => setShowModal(false)} />
      )}
    </>
  );
};

Default.args = {
  title: "Title",
  portalId: "portal",
  content: <Text>contenido sobre del modal</Text>,
  buttonLabel: "Close", // Incluye el argumento buttonLabel
};

export default meta;

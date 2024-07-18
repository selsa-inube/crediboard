import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Button, Text } from "@inube/design-system";

import { IListmodalProps, Listmodal } from "..";
import { parameters, props } from "./props";

const meta: Meta<typeof Listmodal> = {
  title: "components/modals/Listmodal",
  component: Listmodal,
  parameters,
  argTypes: props,
};

type Story = StoryObj<typeof Listmodal>;
export const Default: Story = (args: IListmodalProps) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button onClick={() => setShowModal(true)}>Modal List</Button>
      {showModal && (
        <Listmodal {...args} handleClose={() => setShowModal(false)} />
      )}
    </>
  );
};
Default.args = {
  title: "Title",
  portalId: "portal",
  content: <Text>contenido sobre del modal</Text>,
};

export default meta;

import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Button, Text } from "@inube/design-system";

import { IPascalCaseProps, PascalCase } from "..";
import { parameters, props } from "./props";

const meta: Meta<typeof PascalCase> = {
  title: "components/modals/PascalCase",
  component: PascalCase,
  parameters,
  argTypes: props,
};

type Story = StoryObj<typeof PascalCase>;
export const Default: Story = (args: IPascalCaseProps) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button onClick={() => setShowModal(true)}>Modal List</Button>
      {showModal && (
        <PascalCase {...args} handleClose={() => setShowModal(false)} />
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

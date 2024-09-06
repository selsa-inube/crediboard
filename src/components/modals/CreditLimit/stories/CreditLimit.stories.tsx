import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { CreditLimit, IListModalProps } from "..";

const meta: Meta<typeof CreditLimit> = {
  title: "components/modals/CreditLimit",
  component: CreditLimit,
  parameters: {
    backgrounds: { default: "light" },
  },
  argTypes: {
    title: {
      control: { type: "text" },
    },
    portalId: {
      control: { type: "text" },
    },
    handleClose: { action: "closed" },
  },
};

export default meta;

type Story = StoryObj<typeof CreditLimit>;

export const Default: Story = (args: IListModalProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Abrir Modal</button>
      {showModal && (
        <>
          <div id="portal"></div>
          <CreditLimit {...args} handleClose={() => setShowModal(false)} />
        </>
      )}
    </>
  );
};

Default.args = {
  title: "Origen de cupo ",
  portalId: "portal",
};

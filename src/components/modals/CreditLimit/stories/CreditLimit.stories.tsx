import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Button } from "@inubekit/button";

import { CreditLimit, ICreditLimitProps } from "..";

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
    maxPaymentCapacity: {
      control: { type: "number" },
    },
    maxReciprocity: {
      control: { type: "number" },
    },
    maxDebtFRC: {
      control: { type: "number" },
    },
    assignedLimit: {
      control: { type: "number" },
    },
    currentPortfolio: {
      control: { type: "number" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CreditLimit>;

export const Default: Story = (args: ICreditLimitProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Abrir Modal</Button>
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
  title: "Origen de cupo",
  portalId: "portal",
  maxPaymentCapacity: 50000000,
  maxReciprocity: 40000000,
  maxDebtFRC: 45000000,
  assignedLimit: 0,
  currentPortfolio: 10000000,
};

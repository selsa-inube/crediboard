import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@inubekit/button";

import { ShareCreditModal, IShareCreditModalProps } from ".";

type Story = StoryObj<typeof ShareCreditModal>;

const shareCreditModal: Meta<typeof ShareCreditModal> = {
  title: "components/modals/shareCreditModal",
  component: ShareCreditModal,
};

export const Default: Story = (args: IShareCreditModalProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Share credit prospect</Button>
      {showModal && (
        <ShareCreditModal {...args} handleClose={() => setShowModal(false)} />
      )}
    </>
  );
};

Default.args = {
  portalId: "portal",
  isMobile: false,
};

export default shareCreditModal;

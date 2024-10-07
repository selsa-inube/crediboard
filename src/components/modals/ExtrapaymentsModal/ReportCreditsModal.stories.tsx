import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@inubekit/button";

import { ReportCreditsModal, ReportCreditsModalProps } from ".";

const meta: Meta<typeof ReportCreditsModal> = {
  title: "components/modals/ExtrapaymentsModal",
  component: ReportCreditsModal,
};

type Story = StoryObj<ReportCreditsModalProps>;

const Default: Story = (args: ReportCreditsModalProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Modal Report Credit</Button>
      {showModal && (
        <ReportCreditsModal {...args} handleClose={() => setShowModal(false)} />
      )}
    </>
  );
};

Default.args = {
  totalFee: 3300000,
  totalBalance: 87000000,
};

export { Default };
export default meta;

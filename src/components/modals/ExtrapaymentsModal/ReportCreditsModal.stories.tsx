import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@inubekit/button";

import { ReportCreditsModal, ReportCreditsModalProps } from ".";
import { dataReport } from "./config";

const meta: Meta<typeof ReportCreditsModal> = {
  title: "components/modals/ExtrapaymentsModal",
  component: ReportCreditsModal,
};

type Story = StoryObj<ReportCreditsModalProps>;

const Default: Story = (args: ReportCreditsModalProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Open Modal</Button>
      {showModal && (
        <ReportCreditsModal {...args} handleClose={() => setShowModal(false)} />
      )}
    </>
  );
};

Default.args = {
  title: dataReport.title,
};

export { Default };
export default meta;

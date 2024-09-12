import { Meta } from "@storybook/react";
import { useState } from "react";
import { Button } from "@inubekit/button";

import { ReportCreditsModal } from ".";

const meta: Meta<typeof ReportCreditsModal> = {
  title: "components/modals/ReportCreditsModal",
  component: ReportCreditsModal,
};

const Default = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Modal Report Credit</Button>
      {showModal && (
        <ReportCreditsModal handleClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export { Default };
export default meta;

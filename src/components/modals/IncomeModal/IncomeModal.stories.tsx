import { useState } from "react";

import { Meta } from "@storybook/react";
import { Button } from "@inubekit/button";

import { IncomeModal } from ".";
import { DebtorData } from "./interface";

const meta: Meta<typeof IncomeModal> = {
  title: "components/modals/IncomeModal",
  component: IncomeModal,
};

const Default = () => {
  const { form, onChange, options } = DebtorData();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Modal Income</Button>
      {showModal && (
        <IncomeModal
          form={form}
          onChange={onChange}
          options={options}
          handleClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export { Default };
export default meta;

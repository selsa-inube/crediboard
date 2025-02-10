import { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";
import { Button } from "@inubekit/button";
import { DeductibleExpensesModal } from ".";
import type { DeductibleExpensesModalProps } from ".";

const meta: Meta<typeof DeductibleExpensesModal> = {
  title: "components/modals/Deductibleexpensesmodal",
  component: DeductibleExpensesModal,
};

export default meta;

const Default: StoryFn<typeof DeductibleExpensesModal> = (
  args: DeductibleExpensesModalProps
) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>
        Modal Deductible Expenses
      </Button>
      {showModal && (
        <DeductibleExpensesModal
          {...args}
          handleClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export { Default };

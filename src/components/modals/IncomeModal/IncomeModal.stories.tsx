import { useState } from "react";

import { Meta, StoryFn } from "@storybook/react";
import { Button } from "@inubekit/button";

import { IncomeModal, IncomeModalProps } from ".";

const meta: Meta<typeof IncomeModal> = {
  title: "components/modals/IncomeModal",
  component: IncomeModal,
};

const options = [
  { id: "user1", label: "Camilo Rincón", value: "camilo-rincon" },
  {
    id: "user2",
    label: "Juan Carlos Pérez Gómez",
    value: "juan-carlos-perez-gomez",
  },
  {
    id: "user3",
    label: "Sofía Alejandra Romero Ruiz",
    value: "sofia-alejandra-romero-ruiz",
  },
];

export const Default: StoryFn<IncomeModalProps> = (args) => {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ debtor: "" });

  const onChange = (name: string, newValue: string) => {
    setForm({ ...form, [name]: newValue });
  };

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Modal Income</Button>
      {showModal && (
        <IncomeModal
          {...args}
          handleClose={() => setShowModal(false)}
          form={form}
          onChange={onChange}
        />
      )}
    </>
  );
};

Default.args = {
  options,
};

export default meta;

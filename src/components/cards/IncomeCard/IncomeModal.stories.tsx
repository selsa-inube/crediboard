import { useState } from "react";

import { Meta, StoryFn } from "@storybook/react";

import { IncomeCard, IncomeCardProps } from ".";

const meta: Meta<typeof IncomeCard> = {
  title: "components/cards/incomeCard",
  component: IncomeCard,
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

export const Default: StoryFn<IncomeCardProps> = (args) => {
  const [form, setForm] = useState({ debtor: "" });

  const onChange = (name: string, newValue: string) => {
    setForm({ ...form, [name]: newValue });
  };

  return <IncomeCard {...args} form={form} onChange={onChange} />;
};

Default.args = {
  options,
};

export default meta;

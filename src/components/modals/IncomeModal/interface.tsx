import { useState } from "react";

export const DebtorData = () => {
  const [form, setForm] = useState({ name: "" });

  const onChange = (name: string, newValue: string) => {
    setForm({ ...form, [name]: newValue });
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

  return {
    form,
    onChange,
    options,
  };
};

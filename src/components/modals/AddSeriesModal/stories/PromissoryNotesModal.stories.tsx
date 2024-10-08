import { useState } from "react";
import { StoryFn, Meta } from "@storybook/react";
import { Button } from "@inube/design-system";
import { PromissoryNotesModal, PromissoryNotesModalProps } from "../index";
import { props } from "./props";

// Sample options for the selects
const paymentMethodOptions = [
  { id: "bank_transfer", label: "Transferencia Bancaria", value: "bank_transfer" },
  { id: "credit_card", label: "Tarjeta de Crédito", value: "credit_card" },
  { id: "cash", label: "Efectivo", value: "cash" },
];

const frequencyOptions = [
  { id: "monthly", label: "Mensual", value: "monthly" },
  { id: "quarterly", label: "Trimestral", value: "quarterly" },
  { id: "annually", label: "Anual", value: "annually" },
];

const firstPaymentOptions = [
  { id: "next_month", label: "Próximo mes", value: "next_month" },
  { id: "next_quarter", label: "Próximo trimestre", value: "next_quarter" },
  { id: "next_year", label: "Próximo año", value: "next_year" },
];

const story: Meta<typeof PromissoryNotesModal> = {
  component: PromissoryNotesModal,
  title: "components/modals/AddSeriesModal",
  argTypes: props,
};

const DefaultTemplate: StoryFn<PromissoryNotesModalProps> = (args) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const portalId = "portal";
  let portalNode = document.getElementById(portalId);
  if (!portalNode) {
    portalNode = document.createElement("div");
    portalNode.setAttribute("id", portalId);
    document.body.appendChild(portalNode);
  }

  return (
    <>
      <Button onClick={handleShowModal}>Open Modal</Button>
      {showModal && (
        <PromissoryNotesModal
          {...args}
          handleClose={handleShowModal}
          paymentMethodOptions={paymentMethodOptions} // Pass options
          frequencyOptions={frequencyOptions}         // Pass options
          firstPaymentOptions={firstPaymentOptions}   // Pass options
        />
      )}
    </>
  );
};

export const Default = DefaultTemplate.bind({});
Default.args = {
  title: "Nueva serie",
  buttonText: "Enviar",
  portalId: "portal",
  formValues: { field1: 0, field2: 0 }, // Provide default form values
};

export default story;

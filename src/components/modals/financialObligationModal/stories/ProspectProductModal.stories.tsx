import { useState } from "react";
import { FormikValues } from "formik";
import { Meta, StoryObj } from "@storybook/react";
import { Button } from "@inubekit/button";
import { MdAdd, MdCached } from "react-icons/md";
import { action } from "@storybook/addon-actions";

import {
  Schedule,
  CreditLine,
  PaymentMethod,
  AmortizationType,
  RateType,
} from "@services/enums";

import { props, parameters } from "./props";
import { FinancialObligationModal, FinancialObligationModalProps } from "..";

const meta: Meta<typeof FinancialObligationModal> = {
  title: "components/modals/financialObligationModal",
  component: FinancialObligationModal,
  parameters: parameters,
  argTypes: props,
};

type Story = StoryObj<typeof FinancialObligationModal>;

export const Create: Story = (args: FinancialObligationModalProps) => {
  const [showModal, setShowModal] = useState(false);
  const initialValues: FormikValues = {
    creditLine: "",
    creditAmount: "",
    paymentMethod: "",
    paymentCycle: "",
    firstPaymentCycle: "",
    termInMonths: "",
    amortizationType: "",
    interestRate: "",
    rateType: "",
  };

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Abrir Modal</Button>
      {showModal && (
        <FinancialObligationModal
          {...args}
          initialValues={initialValues}
          onCloseModal={() => {
            setShowModal(false);
            action("onCloseModal")();
            args.onCloseModal();
          }}
          onConfirm={(values) => {
            setShowModal(false);
            action("onConfirm")();
            args.onConfirm(values); 
          }}
        />
      )}
    </>
  );
};

Create.args = {
  portalId: "portal",
  title: "Agregar Obligacion",
  confirmButtonText: "Agregar",
  iconBefore: <MdAdd />,
};

export const Edit: Story = (args: FinancialObligationModalProps) => {
  const [showModal, setShowModal] = useState(false);
  const initialValues: FormikValues = {
    creditLine: CreditLine.Vacation,
    creditAmount: 10000000,
    paymentMethod: PaymentMethod.MonthlyPayroll,
    paymentCycle: Schedule.Biweekly,
    firstPaymentCycle: "ciclo1",
    termInMonths: "48",
    amortizationType: AmortizationType.FixedIntegralPayments,
    interestRate: 2.15,
    rateType: RateType.Fixed,
  };

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Abrir Modal</Button>
      {showModal && (
        <FinancialObligationModal
          {...args}
          initialValues={initialValues}
          onCloseModal={() => {
            setShowModal(false);
            action("onCloseModal")();
            args.onCloseModal();
          }}
          onConfirm={(values) => {
            setShowModal(false);
            action("onConfirm")();
            args.onConfirm(values); 
          }}
        />
      )}
    </>
  );
};

Edit.args = {
  portalId: "portal",
  title: "Nombre de producto",
  confirmButtonText: "Actualizar",
  iconAfter: <MdCached />,
};

export default meta;

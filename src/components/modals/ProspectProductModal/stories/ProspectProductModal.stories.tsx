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
import { ProspectProductModal, ProspectProductModalProps } from "..";

const meta: Meta<typeof ProspectProductModal> = {
  title: "components/modals/ProspectProductModal",
  component: ProspectProductModal,
  parameters: parameters,
  argTypes: props,
};

type Story = StoryObj<typeof ProspectProductModal>;

export const Create: Story = (args: ProspectProductModalProps) => {
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
        <ProspectProductModal
          {...args}
          initialValues={initialValues}
          onCloseModal={() => {
            setShowModal(false);
            action("onCloseModal")();
            args.onCloseModal();
          }}
          onConfirm={() => {
            setShowModal(false);
            action("onConfirm")();
            args.onConfirm();
          }}
        />
      )}
    </>
  );
};

Create.args = {
  portalId: "portal",
  title: "Agregar producto",
  confirmButtonText: "Agregar",
  iconBefore: <MdAdd />,
};

export const Edit: Story = (args: ProspectProductModalProps) => {
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
        <ProspectProductModal
          {...args}
          initialValues={initialValues}
          onCloseModal={() => {
            setShowModal(false);
            action("onCloseModal")();
            args.onCloseModal();
          }}
          onConfirm={() => {
            setShowModal(false);
            action("onConfirm")();
            args.onConfirm();
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

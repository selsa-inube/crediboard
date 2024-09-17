import type { Meta, StoryObj } from "@storybook/react";

import { TableExtraordinaryPayment } from "..";
import { props } from "./props";
import { IRowExtraordinaryPayment } from "@src/components/modals/ExtraordinaryPaymentModal/types";

type Story = StoryObj<typeof TableExtraordinaryPayment>;

const meta: Meta<typeof TableExtraordinaryPayment> = {
  title: "components/data/TableExtraordinaryPayment",
  component: TableExtraordinaryPayment,
  argTypes: props,
};

const data: IRowExtraordinaryPayment[] = [
  {
    id:"1",
    datePayment: "Mar 25-26",
    value: 1500000,
    paymentMethod: "Selsa",
  },
  {
    id:"2",
    datePayment: "Mar 25-26",
    value: 1000000,
    paymentMethod: "Selsa",
  },
  {
    id:"3",
    datePayment: "Mar 25-26",
    value: 2000000,
    paymentMethod: "Prima",
  },
  {
    id:"4",
    datePayment: "Mar 25-26",
    value: 2500000,
    paymentMethod: "Cesantias",
  },
  {
    id:"5",
    datePayment: "Mar 25-26",
    value: 3000000,
    paymentMethod: "Cesantias",
  },
  {
    id:"6",
    datePayment: "Mar 25-26",
    value: 3500000,
    paymentMethod: "Prima",
  },
  {
    id:"7",
    datePayment: "Mar 25-26",
    value: 4000000,
    paymentMethod: "Selsa",
  },
  {
    id:"8",
    datePayment: "Mar 25-26",
    value: 4500000,
    paymentMethod: "Selsa",
  },
  {
    id:"9",
    datePayment: "Mar 25-26",
    value: 5000000,
    paymentMethod: "Prima",
  },
  {
    id:"10",
    datePayment: "Mar 25-26",
    value: 5500000,
    paymentMethod: "Cesantias",
  },
  {
    id:"11",
    datePayment: "Mar 25-26",
    value: 6000000,
    paymentMethod: "Cesantias",
  },

];
export const Default: Story = {
  args: {
    data,
    onClickDetails: (id: string) => console.log("onClickDetails", id),
    onClickEdit: (id: string) => console.log("onClickEdit", id),
    onClickEliminate: (id: string) => console.log("onClickEliminate", id),
  },
};
export default meta;

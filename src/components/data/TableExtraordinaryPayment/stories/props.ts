import { ArgTypes } from "@storybook/react";
import { TableExtraordinaryPaymentProps } from "..";

export const props: Partial<ArgTypes<TableExtraordinaryPaymentProps>> = {
  data: {
    description: "Data to be displayed on the table",
    table: {
      type: {
        summary: "IRowExtraordinaryPayment[]",
      },
    },
  },
  onClickDetails: {
    description: "Function to handle the click on the details button",
    table: {
      type: {
        summary: "() => void",
      },
    },
  },
  onClickEdit: {
    description: "Function to handle the click on the edit button",
    table: {
      type: {
        summary: "() => void",
      },
    },
  },
  onClickEliminate: {
    description: "Function to handle the click on the eliminate button",
    table: {
      type: {
        summary: "() => void",
      },
    },
  },
};

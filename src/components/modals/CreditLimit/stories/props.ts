
import { ArgTypes } from "@storybook/react";

export const props: ArgTypes = {
  title: {
    control: { type: "text" },
  },
  portalId: {
    control: { type: "text" },
  },
  handleClose: { action: "closed" },
  maxPaymentCapacity: {
    control: { type: "number" },
  },
  maxReciprocity: {
    control: { type: "number" },
  },
  maxDebtFRC: {
    control: { type: "number" },
  },
  assignedLimit: {
    control: { type: "number" },
  },
  currentPortfolio: {
    control: { type: "number" },
  },
  maxUsableLimit: {
    control: { type: "number" },
  },
  availableLimitWithoutGuarantee: {
    control: { type: "number" },
  },
};

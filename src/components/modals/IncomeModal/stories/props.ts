import { ArgTypes } from "@storybook/react";
import { IncomeModalProps } from '../interface';

export const props: Partial<ArgTypes<IncomeModalProps>> = {
  title: {
    control: { type: "text" },
  },
  handleClose: { action: "closed" },
}
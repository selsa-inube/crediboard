import { ArgTypes } from "@storybook/react";
import {IncomeModalProps} from ".."

export const props: Partial<ArgTypes<IncomeModalProps>> = {
  title: {
    control: { type: "text" },
  },
  handleClose: { action: "closed" },
}
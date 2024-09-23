import { ArgTypes } from "@storybook/react";
import { PaymentCapacityProps } from '../interface';

export const props: Partial<ArgTypes<PaymentCapacityProps>> = {
  title: {
    control: { type: "text" },
  },
  handleClose: { action: "closed" },
}
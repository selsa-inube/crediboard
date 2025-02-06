import { ArgTypes } from "@storybook/react";
import { ICreditLimitProps } from ".."

export const props: Partial<ArgTypes<ICreditLimitProps>> = {
  title: {
    control: { type: "text" },
  },
  portalId: {
    control: { type: "text" },
  },
  handleClose: { action: "closed" },
};

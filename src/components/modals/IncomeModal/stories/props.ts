import { ArgTypes } from "@storybook/react";

export const props: ArgTypes = {
  title: {
    control: { type: "text" },
  },
  portalId: {
    control: { type: "text" },
  },
  handleClose: { action: "closed" },
}
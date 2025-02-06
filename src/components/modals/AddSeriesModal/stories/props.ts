import { ArgTypes } from "@storybook/react";
import { AddSeriesModalProps } from "..";

export const parameters = {
  docs: {
    description: {
      component:
        "modal to add a new series",
    },
  },
};

export const props: Partial<ArgTypes<AddSeriesModalProps>> = {
  portalId: {
    control: {
      type: "text",
    },
    description: "ID del portal donde se renderiza el modal",
    defaultValue: "portal",
  },
  handleClose: {
    action: "handleClose",
    description: "Función para manejar el cierre del modal",
  },
};

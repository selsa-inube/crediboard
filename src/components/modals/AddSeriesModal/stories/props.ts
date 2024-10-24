import { ArgTypes } from "@storybook/react";
import { AddSeriesModalProps } from "../type";

export const parameters = {
  docs: {
    description: {
      component:
        "modal to add a new series",
    },
  },
};

export const props: Partial<ArgTypes<AddSeriesModalProps>> = {
  title: {
    control: {
      type: "text",
    },
    description: "Título del modal",
    defaultValue: "Confirma los datos del usuario",
  },
  buttonText: {
    control: {
      type: "text",
    },
    description: "Texto del botón",
    defaultValue: "hola",
  },
  secondButtonText: {
    control: {
      type: "text",
    },
    description: "Texto del segundo botón",
    defaultValue: "hola",
  },
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

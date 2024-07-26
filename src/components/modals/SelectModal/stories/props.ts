import { ArgTypes } from "@storybook/react";
import { SelectModalProps } from "..";

const props: Partial<ArgTypes<SelectModalProps>> = {
  title: {
    control: "text",
    description: "Title of the modal",
  },
  buttonText: {
    control: "text",
    description: "Text for the submit button",
  },
  inputLabel: {
    control: "text",
    description: "Label for the select input",
  },
  inputPlaceholder: {
    control: "text",
    description: "Placeholder for the select input",
  },
  portalId: {
    control: "text",
    description: "ID of the portal node",
  },
  onSubmit: {
    action: "submitted",
    description: "Function called when the form is submitted",
  },
  onCloseModal: {
    action: "closed",
    description: "Function called when the modal is closed",
  },
};

export { props };

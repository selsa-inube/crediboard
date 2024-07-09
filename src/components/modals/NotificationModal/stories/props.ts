const props = {
    title: {
      control: "text",
      description: "Title of the modal",
    },
    buttonText: {
      control: "text",
      description: "Text for the submit button",
    },
    confirmationText: {
      control: "text",
      description: "Text to confirm action",
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
  
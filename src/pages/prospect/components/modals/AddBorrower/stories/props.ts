export const parameters = {
  docs: {
    description: {
      component: "Modal to create new borrowers.",
    },
  },
};

export const props = {
  title: {
    description: "main title of the modal",
  },
  portalId: {
    description: "name of the html element where the modal is rendered",
  },
  content: {
    description:
      "element to be rendered in the modal, usually a form to create a new borrower. ",
  },
};

export const TipeOfDocument = [
  { id: "01", label: "CC", value: "CC" },
  { id: "02", label: "CE", value: "CE" },
  { id: "03", label: "TI", value: "TI" },
];

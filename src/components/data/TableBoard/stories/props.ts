export const props = {
  id: {
    control: "text",
    description: "Component identifier in the DOM",
  },
  borderTable: {
    control: "boolean",
    description: "Indicates whether or not the table has the solid border ",
  },
  entries: {
    control: "object",
    description: "Information to be displayed in table",
  },
  actions: {
    control: "object",
    description: "Actions or events you want to perform from the table",
  },
  titles: {
    control: "object",
    description: "Titles or th of the table",
  },
};

const props = {
  sectionTitle: {
    control: "text",
    description: "Section title",
  },
  numberActiveCards: {
    control: "number",
    description: "Number of active cards in the section",
  },
  sectionBackground: {
    control: {
      type: "select",
      options: ["gray", "light"],
    },
    description: "Section background",
  },
  orientation: {
    control: {
      type: "select",
      options: ["vertical", "horizontal"],
    },
    description: "Section orientation",
  },
  children: {
    control: "object",
    description: "Child elements of the component",
  },
};

export { props };

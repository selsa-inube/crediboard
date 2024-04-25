const props = {
  sectionTitle: {
    control: "text",
    description: "Section title",
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
  sectionInformation: {
    control: "array",
    description: "information about section summary cards",
  },
};

export { props };

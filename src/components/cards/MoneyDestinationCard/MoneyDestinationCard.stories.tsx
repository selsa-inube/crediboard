import { action } from "@storybook/addon-actions";

import { MoneyDestinationCard, MoneyDestinationCardProps } from "./index";

const story = {
  components: [MoneyDestinationCard],
  title: "components/Cards/MoneyDestinationCard",
  argTypes: {
    id: {
      control: { type: "text" },
      description: "Unique identifier for the radio option.",
    },
    name: {
      control: { type: "text" },
      description: "Name of the radio input, used to group radio options.",
    },
    value: {
      control: { type: "text" },
      description: "Value associated with the radio option.",
    },
    label: {
      control: { type: "text" },
      description: "Text label displayed next to the radio option.",
    },
    icon: {
      control: { type: "element" },
      description: "Icon element to display on the card.",
    },
    handleChange: {
      action: "handleChange",
      description: "Function called when the radio option is selected.",
    },
  },
};

const Default = (args: MoneyDestinationCardProps) => (
  <MoneyDestinationCard {...args} />
);

Default.args = {
  id: "Id",
  name: "Client",
  value: "Value",
  label: "Label",
  icon: "MdAndroid",
  isSelected: false,
  handleChange: action("handleChange"),
} satisfies MoneyDestinationCardProps;

export default story;

export { Default };

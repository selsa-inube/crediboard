import { CardBorrower, ICardBorrowerProps } from "./index";

const story = {
  components: [CardBorrower],
  title: "components/Cards/CardBorrower",
  argTypes: {
    name: {
      control: { type: "text" },
      description: "Nombre del prestatario que se mostrará en el card.",
    },
  },
};

const Default = (args: ICardBorrowerProps) => <CardBorrower {...args} />;

Default.args = {
  label: "Deudor",
  placeHolder: "Camilo Rincón"
} satisfies ICardBorrowerProps;

export default story;

export { Default };

import { CardBorrower, ICardNewBorrowerProps } from "./index";

const story = {
  components: [CardBorrower],
  title: "components/Cards/CardNewBorrower",
  argTypes: {
    name: {
      control: { type: "text" },
      description: "Nombre del prestatario que se mostrará en el card.",
    },
  },
};

const Default = (args: ICardNewBorrowerProps) => <CardBorrower {...args} />;

Default.args = {
  title: `Deudor 1`,
  name: "Camilo Alberto",
  lastName: "Rincon Jaramillo",
  email: "camilo.jaramillo@gmail.com",
  income: "12.000.000",
  obligations: "9.950.000",
} satisfies ICardNewBorrowerProps;

export default story;

export { Default };

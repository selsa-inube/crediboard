import { CardBorrowerNewData, ICardNewBorrowerProps } from "./index";

const story = {
  components: [CardBorrowerNewData],
  title: "components/Cards/CardNewBorrower",
  argTypes: {
    name: {
      control: { type: "text" },
      description: "Nombre del prestatario que se mostrará en el card.",
    },
  },
};

const Default = (args: ICardNewBorrowerProps) => (
  <CardBorrowerNewData {...args} />
);

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

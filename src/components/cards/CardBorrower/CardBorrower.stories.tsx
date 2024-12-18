import { CardBorrower, ICardBorrowerProps } from "./index";

const story = {
  components: [CardBorrower],
  title: "components/cards/CardBorrower",
};

const CardBorrowerDefault = (args: ICardBorrowerProps) => (
  <CardBorrower {...args} />
);

CardBorrowerDefault.args = {
  label: "Correo electrónico",
  placeHolder: "daniel.rodriguez98@hotmail.com",
  data: "Cédula de ciudadanía",
};

export default story;

export { CardBorrowerDefault };

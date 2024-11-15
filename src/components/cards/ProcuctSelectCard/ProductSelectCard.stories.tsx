import { ProductSelectCard, IProductSelectCardProps } from "./index";

const story = {
  components: [ProductSelectCard],
  title: "components/Cards/ProductSelectCard",
  argTypes: {
    amount: {
      control: { type: "number" },
      description: "Monto asociado al producto.",
    },
    rate: {
      control: { type: "number" },
      description: "Tasa de interés del producto.",
    },
    term: {
      control: { type: "number" },
      description: "Plazo del producto en meses.",
    },
    description: {
      control: { type: "text" },
      description: "Descripción del producto.",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Indica si el componente está deshabilitado.",
    },
  },
};

const Default = (args: IProductSelectCardProps) => (
  <ProductSelectCard {...args} />
);

Default.args = {
  amount: 10000,
  rate: 5,
  term: 12,
  description: "Producto de Prueba",
  disabled: false,
} satisfies IProductSelectCardProps;

export default story;

export { Default };
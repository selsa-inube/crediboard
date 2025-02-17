import { InvestmentCreditCard, InvestmentCreditCardProps } from "./index";

const story = {
  components: [InvestmentCreditCard],
  title: "pages/addProspect/components/InvestmentCreditCard",
  argTypes: {
    title: {
      control: { type: "text" },
      description: "Título del card.",
    },
    code: {
      control: { type: "text" },
      description: "Código que se muestra en el card.",
    },
    codeValue: {
      control: { type: "text" },
      description: "Valor asociado al código.",
    },
    expired: {
      control: { type: "text" },
      description: "Texto que indica el estado de vencimiento.",
    },
    expiredValue: {
      control: { type: "number" },
      description: "Valor asociado al vencimiento.",
    },
  },
};

const Default = (args: InvestmentCreditCardProps) => (
  <InvestmentCreditCard {...args} />
);
Default.args = {
  title: "Crédito libre inversión",
  code: "Código",
  codeValue: "10-12345",
  expired: "Valor vencido",
  expiredValue: 120000,
} satisfies InvestmentCreditCardProps;

export default story;

export { Default };

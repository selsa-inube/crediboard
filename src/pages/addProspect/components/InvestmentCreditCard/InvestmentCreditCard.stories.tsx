import { Meta, StoryObj } from "@storybook/react";
import { InvestmentCreditCard } from "./";

const meta: Meta<typeof InvestmentCreditCard> = {
  title: "pages/addProspect/components/InvestmentCreditCard",
  component: InvestmentCreditCard,
  argTypes: {
    title: { 
      control: "text", 
      description: "Título del card." 
    },
    code: { 
      control: "text", description: 
      "Código que se muestra en el card." 
    },
    codeValue: { 
      control: "text", description: 
      "Valor asociado al código." 
    },
    expired: {
      control: "text",
      description: "Texto que indica el estado de vencimiento.",
    },
    expiredValue: {
      control: "number",
      description: "Valor asociado al vencimiento.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof InvestmentCreditCard>;

export const Default: Story = {
  args: {
    title: "Crédito libre inversión",
    code: "Código",
    codeValue: "10-12345",
    expired: "Valor vencido",
    expiredValue: 120000,
  },
};

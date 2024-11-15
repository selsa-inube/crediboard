import { action } from "@storybook/addon-actions";
import { IncomeCard, IIncomeCardProps } from "./index";

const story = {
  components: [IncomeCard],
  title: "components/Cards/IncomeCard",
  argTypes: {
    title: {
      control: { type: "text" },
      description: "Título del IncomeCard.",
    },
    labels: {
      control: { type: "array" },
      description: "Etiquetas para cada campo de entrada.",
    },
    placeholders: {
      control: { type: "array" },
      description: "Placeholder para cada campo de entrada.",
    },
    values: {
      control: { type: "array" },
      description: "Valores iniciales de los campos de entrada.",
    },
    onChange: {
      action: "onChange",
      description: "Función llamada cuando el valor de un campo cambia.",
    },
  },
};

const Default = (args: IIncomeCardProps) => <IncomeCard {...args} />;

Default.args = {
  title: "Ingreso Mensual",
  labels: ["Salario", "Alquiler", "Otros"],
  placeholders: ["Ej: 3000", "Ej: 1200", "Ej: 500"],
  values: ["", "", ""],
  onChange: (index: number, newValue: string) =>
    action("onChange")(index, newValue),
} satisfies IIncomeCardProps;

export default story;

export { Default };

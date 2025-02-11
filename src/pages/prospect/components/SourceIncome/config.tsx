import { IncomeCard } from "@components/cards/IncomeCard";

interface IncomeProps {
  values: string[];
  ShowSupport?: boolean;
  disabled?: boolean;
  
}

function IncomeCapital({
  values,
  ShowSupport,
  disabled,
}: IncomeProps) {
  return (
    <IncomeCard
      title="Rentas de capital"
      labels={[
        "Arrendamientos",
        "Dividendos o participaciones",
        "Rendimientos financieros",
      ]}
      placeholders={["Arrendamiento/mes", "Utilidades/mes", "Rendimientos/mes"]}
      values={values}

      ShowSupport={ShowSupport}
      disabled={disabled}
    />
  );
}

function IncomeEmployment({
  values,
  ShowSupport,
  disabled,
}: IncomeProps) {
  return (
    <IncomeCard
      title="Rentas de trabajo"
      labels={[
        "Salario mensual",
        "Otros pagos mensuales (No salariales)",
        "Mesadas pensionales",
      ]}
      placeholders={[
        "Salario percibido/mes",
        "Subsidios, utilidades, propinas, etc.",
        "Pensión/mes",
      ]}
      values={values}

      ShowSupport={ShowSupport}
      disabled={disabled}
    />
  );
}

function MicroBusinesses({
  values,
  ShowSupport,
  disabled,
}: IncomeProps) {
  return (
    <IncomeCard
      title="Otros ingresos variables"
      labels={["Ganancia promedio mensual", "Honorarios mensuales"]}
      placeholders={["Ganancias/mes", "Honorarios/mes"]}
      values={values}
      ShowSupport={ShowSupport}
      disabled={disabled}
    />
  );
}

export { IncomeCapital, IncomeEmployment, MicroBusinesses };

import { IncomeCard } from "@components/cards/IncomeCard";

interface IncomeProps {
  values: string[];
  onChange: (index: number, newValue: string) => void;
  ShowSupport?: boolean;
}

function IncomeCapital({ values, onChange, ShowSupport }: IncomeProps) {
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
      onChange={onChange}
      ShowSupport={ShowSupport}
    />
  );
}

function IncomeEmployment({ values, onChange, ShowSupport }: IncomeProps) {
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
      onChange={onChange}
      ShowSupport={ShowSupport}
    />
  );
}

function MicroBusinesses({ values, onChange, ShowSupport }: IncomeProps) {
  return (
    <IncomeCard
      title="Otros ingresos variables"
      labels={["Ganancia promedio mensual", "Honorarios mensuales"]}
      placeholders={["Ganancias/mes", "Honorarios/mes"]}
      values={values}
      onChange={onChange}
      ShowSupport={ShowSupport}
    />
  );
}

function ProfessionalServices({ values, onChange, ShowSupport }: IncomeProps) {
  return (
    <IncomeCard
      title="Servicios profesionales"
      labels={["Honorarios mensuales"]}
      placeholders={["Honorarios/mes"]}
      values={values}
      onChange={onChange}
      ShowSupport={ShowSupport}
    />
  );
}

export {
  IncomeCapital,
  IncomeEmployment,
  MicroBusinesses,
  ProfessionalServices,
};

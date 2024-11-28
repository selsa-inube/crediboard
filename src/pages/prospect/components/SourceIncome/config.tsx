import { IncomeCard } from "@components/cards/IncomeCard";

interface IncomeProps {
  values: string[];
  onChange: (index: number, newValue: string) => void;
  noShowSupport?: boolean;
}

function IncomeCapital({ values, onChange, noShowSupport }: IncomeProps) {
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
      noShowSupport={noShowSupport}
    />
  );
}

function IncomeEmployment({ values, onChange, noShowSupport }: IncomeProps) {
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
      noShowSupport={noShowSupport}
    />
  );
}

function MicroBusinesses({ values, onChange, noShowSupport }: IncomeProps) {
  return (
    <IncomeCard
      title="Otros ingresos variables"
      labels={["Ganancia promedio mensual", "Honorarios mensuales"]}
      placeholders={["Ganancias/mes", "Honorarios/mes"]}
      values={values}
      onChange={onChange}
      noShowSupport={noShowSupport}
    />
  );
}

function ProfessionalServices({
  values,
  onChange,
  noShowSupport,
}: IncomeProps) {
  return (
    <IncomeCard
      title="Servicios profesionales"
      labels={["Honorarios mensuales"]}
      placeholders={["Honorarios/mes"]}
      values={values}
      onChange={onChange}
      noShowSupport={noShowSupport}
    />
  );
}

export {
  IncomeCapital,
  IncomeEmployment,
  MicroBusinesses,
  ProfessionalServices,
};

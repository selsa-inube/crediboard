import { Sources } from "./Sources";

interface IncomeProps {
  values: string[];
  onChange: (index: number, newValue: string) => void;
}

function IncomeCapital({ values, onChange }: IncomeProps) {
  return (
    <Sources
      title="Rentas de capital"
      labels={[
        "Arrendamientos",
        "Dividendos o participaciones",
        "Rendimientos financieros",
      ]}
      placeholders={["Arrendamiento/mes", "Utilidades/mes", "Rendimientos/mes"]}
      values={values}
      onChange={onChange}
    />
  );
}

function IncomeEmployment({ values, onChange }: IncomeProps) {
  return (
    <Sources
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
    />
  );
}

function MicroBusinesses({ values, onChange }: IncomeProps) {
  return (
    <Sources
      title="Micronegocios personales y otros"
      labels={["Ganancia promedio mensual", "Honorarios mensuales"]}
      placeholders={["Ganancias/mes", "Honorarios/mes"]}
      values={values}
      onChange={onChange}
    />
  );
}

function ProfessionalServices({ values, onChange }: IncomeProps) {
  return (
    <Sources
      title="Servicios profesionales"
      labels={["Honorarios mensuales"]}
      placeholders={["Honorarios/mes"]}
      values={values}
      onChange={onChange}
    />
  );
}

export {
  IncomeCapital,
  IncomeEmployment,
  MicroBusinesses,
  ProfessionalServices,
};

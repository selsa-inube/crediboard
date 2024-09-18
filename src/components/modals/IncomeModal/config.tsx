import { Sources } from "./Sources";

function IncomeCapital() {
  return (
    <Sources
      title="Rentas de capital"
      labels={[
        "Arrendamientos",
        "Dividendos o participaciones",
        "Rendimientos financieros",
      ]}
      placeholders={["Arrendamiento/mes", "Utilidades/mes", "Rendimientos/mes"]}
    />
  );
}

function IncomeEmployment() {
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
    />
  );
}

function MicroBusinesses() {
  return (
    <Sources
      title="Micronegocios personales y otros"
      labels={["Ganancia promedio mensual"]}
      placeholders={["Ganancias/mes"]}
    />
  );
}

function ProfessionalServices() {
  return (
    <Sources
      title="Servicios profesionales"
      labels={["Honorarios mensuales"]}
      placeholders={["Honorarios/mes"]}
    />
  );
}

export {
  IncomeCapital,
  IncomeEmployment,
  MicroBusinesses,
  ProfessionalServices,
};

import { MaritalStatus, EconomicActivity } from "@services/enums";

export const getMaritalStatusInSpanish = (status: MaritalStatus): string => {
  switch (status) {
    case MaritalStatus.Married:
      return "Casado";
    case MaritalStatus.Single:
      return "Soltero";
    case MaritalStatus.Divorced:
      return "Divorciado";
    case MaritalStatus.Widowed:
      return "Viudo";
    default:
      return status;
  }
};

export const getEconomicActivityInSpanish = (
  activity: EconomicActivity
): string => {
  switch (activity) {
    case EconomicActivity.Pensioner:
      return "Pensionado";
    case EconomicActivity.Employed:
      return "Empleado";
    case EconomicActivity.Unemployed:
      return "Desempleado";
    case EconomicActivity.Student:
      return "Estudiante";
    default:
      return activity;
  }
};

import { MaritalStatus, EconomicActivity, Schedule } from "@services/enums";

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

export const getScheduleInSpanish = (schedule: Schedule): string => {
  switch (schedule) {
    case Schedule.Weekly:
      return "Semanal";
    case Schedule.TenDayIntervals:
      return "Intervalos de 10 días";
    case Schedule.Biweekly:
      return "Quincenal";
    case Schedule.Semimonthly:
      return "Bimensual";
    case Schedule.Monthly:
      return "Mensual";
    case Schedule.Bimonthly:
      return "Bimestral";
    case Schedule.Quarterly:
      return "Trimestral";
    case Schedule.Semiannually:
      return "Semestral";
    case Schedule.Annually:
      return "Anual";
    default:
      return schedule;
  }
};

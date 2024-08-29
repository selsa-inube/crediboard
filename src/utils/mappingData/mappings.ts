import { MaritalStatus, EconomicActivity } from "@services/enums";

export const getMaritalStatusInSpanish = (
  status: keyof typeof MaritalStatus
) => {
  return MaritalStatus[status];
};

export const getEconomicActivityInSpanish = (
  activity: keyof typeof EconomicActivity
) => {
  return EconomicActivity[activity];
};

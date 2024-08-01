import { IRiskScoring } from "@services/types";
import { MaritalStatus, EconomicActivity } from "@services/enums";

export const mockRiskScoring: IRiskScoring[] = [
  {
    totalScore: 456,
    minimumScore: 500,
    tenYearsOld: "Y",
    yearsOldScore: 120,
    riskCenter: 250,
    riskCenterScore: -100,
    jobStabilityIndex: 900,
    jobStabilityIndexScore: 300,
    maritalStatus: MaritalStatus.Married,
    maritalStatusScore: 50,
    economicActivity: EconomicActivity.Pensioner,
    economicActivityScore: 106,
  },
];

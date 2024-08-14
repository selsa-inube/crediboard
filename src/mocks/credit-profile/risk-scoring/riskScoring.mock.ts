import { IRiskScoring } from "@services/types";
import { MaritalStatus, EconomicActivity } from "@services/enums";

export const mockRiskScoring: IRiskScoring[] = [
  {
    total_score: 456,
    minimum_score: 500,
    seniority: 10,
    seniority_score: 120,
    risk_center: 250,
    risk_center_score: -100,
    job_stability_index: 900,
    job_stability_index_score: 300,
    marital_status: MaritalStatus.Married,
    marital_status_score: 50,
    economic_activity: EconomicActivity.Pensioner,
    economic_activity_score: 106,
  },
];

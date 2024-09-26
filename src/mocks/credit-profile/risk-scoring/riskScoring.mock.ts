import { IRiskScoring, IRiskScoringRangeRequered } from "@services/types";
import { MaritalStatus, EconomicActivity } from "@services/enums";

export const mockRangeRequeredByTheBusinessUnit: IRiskScoringRangeRequered[] = [
  {
    seniority_score: 120,
    risk_center_score: 100,
    job_stability_index_score: 100,
    marital_status_score: 80,
    economic_activity_score: 100,
  },
];

export const mockRiskScoring: IRiskScoring[] = [
  {
    credit_request_id: "999990",
    risk_scoring: {
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
  },
  {
    credit_request_id: "999991",
    risk_scoring: {
      total_score: 460,
      minimum_score: 500,
      seniority: 8,
      seniority_score: 110,
      risk_center: 240,
      risk_center_score: -90,
      job_stability_index: 880,
      job_stability_index_score: 290,
      marital_status: MaritalStatus.Single,
      marital_status_score: 40,
      economic_activity: EconomicActivity.Employed,
      economic_activity_score: 100,
    },
  },
  {
    credit_request_id: "999992",
    risk_scoring: {
      total_score: 470,
      minimum_score: 500,
      seniority: 12,
      seniority_score: 130,
      risk_center: 260,
      risk_center_score: -80,
      job_stability_index: 910,
      job_stability_index_score: 310,
      marital_status: MaritalStatus.Married,
      marital_status_score: 60,
      economic_activity: EconomicActivity.Student,
      economic_activity_score: 110,
    },
  },
  {
    credit_request_id: "999993",
    risk_scoring: {
      total_score: 480,
      minimum_score: 500,
      seniority: 15,
      seniority_score: 140,
      risk_center: 270,
      risk_center_score: -70,
      job_stability_index: 920,
      job_stability_index_score: 320,
      marital_status: MaritalStatus.Divorced,
      marital_status_score: 30,
      economic_activity: EconomicActivity.Student,
      economic_activity_score: 90,
    },
  },
  {
    credit_request_id: "999994",
    risk_scoring: {
      total_score: 490,
      minimum_score: 500,
      seniority: 20,
      seniority_score: 150,
      risk_center: 280,
      risk_center_score: -60,
      job_stability_index: 930,
      job_stability_index_score: 330,
      marital_status: MaritalStatus.Widowed,
      marital_status_score: 20,
      economic_activity: EconomicActivity.Pensioner,
      economic_activity_score: 105,
    },
  },
  {
    credit_request_id: "999995",
    risk_scoring: {
      total_score: 500,
      minimum_score: 500,
      seniority: 25,
      seniority_score: 160,
      risk_center: 290,
      risk_center_score: -50,
      job_stability_index: 940,
      job_stability_index_score: 340,
      marital_status: MaritalStatus.Married,
      marital_status_score: 70,
      economic_activity: EconomicActivity.Unemployed,
      economic_activity_score: 120,
    },
  },
  {
    credit_request_id: "999996",
    risk_scoring: {
      total_score: 510,
      minimum_score: 500,
      seniority: 30,
      seniority_score: 170,
      risk_center: 300,
      risk_center_score: -40,
      job_stability_index: 950,
      job_stability_index_score: 350,
      marital_status: MaritalStatus.Single,
      marital_status_score: 80,
      economic_activity: EconomicActivity.Pensioner,
      economic_activity_score: 130,
    },
  },
  {
    credit_request_id: "999997",
    risk_scoring: {
      total_score: 520,
      minimum_score: 500,
      seniority: 35,
      seniority_score: 180,
      risk_center: 310,
      risk_center_score: -30,
      job_stability_index: 960,
      job_stability_index_score: 360,
      marital_status: MaritalStatus.Divorced,
      marital_status_score: 90,
      economic_activity: EconomicActivity.Employed,
      economic_activity_score: 140,
    },
  },
  {
    credit_request_id: "999998",
    risk_scoring: {
      total_score: 530,
      minimum_score: 500,
      seniority: 40,
      seniority_score: 190,
      risk_center: 320,
      risk_center_score: -20,
      job_stability_index: 970,
      job_stability_index_score: 370,
      marital_status: MaritalStatus.Widowed,
      marital_status_score: 100,
      economic_activity: EconomicActivity.Student,
      economic_activity_score: 150,
    },
  },
  {
    credit_request_id: "999999",
    risk_scoring: {
      total_score: 540,
      minimum_score: 500,
      seniority: 45,
      seniority_score: 200,
      risk_center: 330,
      risk_center_score: -10,
      job_stability_index: 980,
      job_stability_index_score: 380,
      marital_status: MaritalStatus.Married,
      marital_status_score: 110,
      economic_activity: EconomicActivity.Pensioner,
      economic_activity_score: 160,
    },
  },
];

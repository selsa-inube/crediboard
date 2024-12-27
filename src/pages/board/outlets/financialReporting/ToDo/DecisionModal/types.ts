import { IMakeDecisionsCreditRequest } from "@services/types";

interface IMakeDecisionsCreditRequestWithXAction {
  makeDecision: IMakeDecisionsCreditRequest;
  humanDecisionDescription: string;
  xAction: string;
}

export type { IMakeDecisionsCreditRequestWithXAction };

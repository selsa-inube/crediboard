import { DmEtapasPrs, Requests } from "@services/types";

export const mapCreditRequestToEntity = (
  data: Record<string, string | number | object>
): Requests => {
  const creditRequest: Requests = {
    creditRequestId: data.creditRequestId as string,
    creditRequestCode: data.creditRequestCode as string,
    creditRequestDateOfCreation: data.creditRequestDateOfCreation as string,
    loanAmount: data.loanAmount as number,
    clientId: data.clientId as string,
    moneyDestinationId: data.moneyDestinationId as string,
    stage: data.stage as DmEtapasPrs,
    moneyDestinationAbreviatedName:
      data.moneyDestinationAbreviatedName as string,
    clientIdentificationNumber: data.clientIdentificationNumber as string,
    clientName: data.clientName as string,
    taskToBeDone: data.taskToBeDone as string,
  };
  return creditRequest;
};

export const mapCreditRequestToEntities = (
  creditRequest: Record<string, string | number | object>[]
): Requests[] => {
  return creditRequest.map(mapCreditRequestToEntity);
};

import { ICreditRequests } from "@pages/SubmitCreditApplication/types";

const mapChangeTracesToReadByIdEntity = (data: string): ICreditRequests => {
  const creditRequest: ICreditRequests = {
    creditRequestId: String(data),
  };
  return creditRequest;
};

export { mapChangeTracesToReadByIdEntity };

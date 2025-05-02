import { IDeleteCreditRequest } from "@pages/SubmitCreditApplication/types";
import { deleteCreditRequests } from "@services/creditRequets/deleteCreditRequets";

export const deleteCreditRequest = async (
  businessUnitPublicCode: string,
  creditRequests: IDeleteCreditRequest
) => {
  let confirmationType = true;
  try {
    await deleteCreditRequests(creditRequests, businessUnitPublicCode);
  } catch (error) {
    confirmationType = false;
    throw error;
  }

  return confirmationType;
};

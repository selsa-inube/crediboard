import { ICreditRequests } from "@pages/SubmitCreditApplication/types";
import { saveCreditRequests } from "@services/creditRequets/postCreditRequests";

export const saveCredit = async (
  businessUnitPublicCode: string,
  creditRequests: ICreditRequests,
  userAccount: string
) => {
  let confirmationType = true;
  try {
    await saveCreditRequests(
      creditRequests,
      businessUnitPublicCode,
      userAccount
    );
  } catch (error) {
    confirmationType = false;
    throw error;
  }

  return confirmationType;
};

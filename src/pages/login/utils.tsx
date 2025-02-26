import { getBusinessUnitsPortalStaff } from "@services/businessUnitsPortalStaff";
import { IBusinessUnitsPortalStaff } from "@services/businessUnitsPortalStaff/types";

const validateBusinessUnities = async (
  publicCode: string,
  userAccount: string
): Promise<IBusinessUnitsPortalStaff[]> => {
  const newData = await getBusinessUnitsPortalStaff(publicCode, userAccount);

  return newData;
};

export { validateBusinessUnities };

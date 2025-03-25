import { getBusinessmanagers } from "@services/businessManager";
import { IBusinessmanagers } from "@services/businessManager/types";
import { IStaffPortalByBusinessManager } from "@services/staffPortal/types";
import { getStaffPortalByBusinessManager } from "@services/staffPortal";

const validateBusinessManagers = async (
  code: string
): Promise<IBusinessmanagers> => {
  const newData = await getBusinessmanagers(code);

  return newData;
};

const validateConsultation = async (): Promise<
  IStaffPortalByBusinessManager[]
> => {
  const newData = await getStaffPortalByBusinessManager();
  return newData;
};

export { validateBusinessManagers, validateConsultation };

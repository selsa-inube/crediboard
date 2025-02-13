import { SectionOrientation } from "@components/layout/BoardSection/types";
import { IBusinessUnitsPortalStaff } from "@services/businessUnitsPortalStaff/types";

interface IPortal {
  abbreviatedName: string;
  staffPortalCatalogId: string;
  businessManagerId: string;
  publicCode: string;
}
interface IBusinessManager {
  publicCode: string;
  abbreviatedName: string;
  urlBrand: string;
  urlLogo: string;
}
interface IPreferences {
  boardOrientation: SectionOrientation;
  showPinnedOnly: boolean;
}

interface IUser {
  userAccount: string;
  userName: string;
  preferences: IPreferences;
}

interface IBusinessUnit {
  businessUnitPublicCode: string;
  abbreviatedName: string;
  urlLogo: string;
  languageId: string;
  descriptionUse?: string;
  firstMonthOfFiscalYear?: string;
}
interface IEventData {
  portal: IPortal;
  businessManager: IBusinessManager;
  businessUnit: IBusinessUnit;
  user: IUser;
}

interface IAppContext {
  eventData: IEventData;
  businessUnitSigla: string;
  businessUnitsToTheStaff: IBusinessUnitsPortalStaff[];
  setEventData: React.Dispatch<React.SetStateAction<IEventData>>;
  setBusinessUnitSigla: React.Dispatch<React.SetStateAction<string>>;
  setBusinessUnitsToTheStaff: React.Dispatch<
    React.SetStateAction<IBusinessUnitsPortalStaff[]>
  >;
}

export type { IEventData, IAppContext, IBusinessUnit };

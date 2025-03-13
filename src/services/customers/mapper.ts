import {
  ICustomer,
  IgeneralAssociateAttributes,
  iGeneralAttributeClientNaturalPersons,
} from "./types";

const mapStaffToEntity = (
  data: Record<string, string | number | object>
): ICustomer => {
  const buildResend: ICustomer = {
    clientAssets: data.clientAssets as string,
    clientBeneficiaryContributions:
      data.clientBeneficiaryContributions as string,
    clientDebts: data.clientDebts as string,
    clientFamilyGroups: data.clientFamilyGroups as string,
    clientNews: data.clientNews as string,
    clientReferences: data.clientReferences as string,
    customerId: data.customerId as string,
    fullName: data.fullName as string,
    generalAssociateAttributes:
      data.generalAssociateAttributes as IgeneralAssociateAttributes,
    generalAttributeClientLegalEntities:
      data.generalAttributeClientLegalEntities as string,
    generalAttributeClientNaturalPersons:
      data.generalAttributeClientNaturalPersons as iGeneralAttributeClientNaturalPersons,
    natureClient: data.natureClient as string,
    periodicCustomerIncomes: data.periodicCustomerIncomes as string,
    publicCode: data.publicCode as string,
  };
  return buildResend;
};

export { mapStaffToEntity };

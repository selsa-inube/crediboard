export interface ICustomerData {
  customerId: string;
  publicCode: string;
  fullName: string;
  natureClient: string;
  generalAttributeClientNaturalPersons: {
    employmentType: string;
    associateType: string;
  }[];
  generalAssociateAttributes: {
    affiliateSeniorityDate: string;
    partnerStatus: string;
  }[];
}

export interface ICustomerContext {
  customerData: ICustomerData;
}

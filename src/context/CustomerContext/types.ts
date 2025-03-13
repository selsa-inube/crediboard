export interface ICustomerData {
  customerId: string;
  publicCode: string;
  fullName: string;
  natureClient: string;
  generalAttributeClientNaturalPersons: {
    employmentType: string;
    associateType: string;
  }[];
}

export interface ICustomerContext {
  customerData: ICustomerData;
}

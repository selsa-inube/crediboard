export interface ICustomerData {
  customerId: string;
  publicCode: string;
  fullName: string;
  natureClient: string;
}

export interface ICustomerContext {
    customerData: ICustomerData;
}
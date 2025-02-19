export const titleButtonTextAssited = {
  goBackText: "Anterior",
  goNextText: "Siguiente",
  submitText: "Radicar",
};

export interface StepDetails {
  id: number;
  number: number;
  name: string;
  description: string;
}

export interface IStep {
  id: number;
  description: string;
  number?: number;
  name?: string;
}

export interface IContactInformation {
  email: string;
  phone: string;
}

export interface IVehicleOffered {
  state: string;
  model: string;
  value: string;
  description: string;
}
export interface IPropertyOffered {
  antique: string;
  estimated: string;
  type: string;
  state: string;
  description: string;
}
export interface IBorrowerData {
  name: string;
  lastName: string;
  email: string;
  income: number;
  obligations: number;
}
export interface IBail {
  client: boolean;
}
export interface FormData {
  contactInformation: IContactInformation;
  propertyOffered: IPropertyOffered;
  vehicleOffered: IVehicleOffered;
  borrowerData: IBorrowerData;
  bail: IBail;
  disbursementGeneral: IDisbursementGeneral;
}

export interface IDisbursementGeneral {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  Internal: {
    amount: string;
    check: boolean;
    toggle: boolean;
    account: string;
    description: string;
    name: string;
    lastName: string;
    sex: string;
    documentType: string;
    identification: string;
    birthdate: string;
    phone: string;
    mail: string;
    city: string;
  };
  External: {
    amount: string;
    check: boolean;
    toggle: boolean;
    bank: string;
    accountType: string;
    accountNumber: string;
    description: string;
    name: string;
    lastName: string;
    sex: string;
    documentType: string;
    identification: string;
    birthdate: string;
    phone: string;
    mail: string;
    city: string;
  };
  CheckEntity: {
    amount: string;
    check: boolean;
    toggle: boolean;
    description: string;
    name: string;
    lastName: string;
    sex: string;
    documentType: string;
    identification: string;
    birthdate: string;
    phone: string;
    mail: string;
    city: string;
  };
  CheckManagement: {
    amount: string;
    check: boolean;
    toggle: boolean;
    description: string;
    name: string;
    lastName: string;
    sex: string;
    documentType: string;
    identification: string;
    birthdate: string;
    phone: string;
    mail: string;
    city: string;
  };
  Cash: {
    amount: string;
    check: boolean;
    toggle: boolean;
    description: string;
    name: string;
    lastName: string;
    sex: string;
    documentType: string;
    identification: string;
    birthdate: string;
    phone: string;
    mail: string;
    city: string;
  };
}

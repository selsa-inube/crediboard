export const titleButtonTextAssited = {
  goBackText: "Anterior",
  goNextText: "Siguiente",
  submitText: "Enviar",
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

interface ContactInformation {
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

export interface IDisbursementTab {
  amount: string;
  account: string;
  description: string;
}
/*export interface DisbursementGeneral {
  internal: IDisbursementTab;
  external: IDisbursementTab;
  check: IDisbursementTab;
  cash: IDisbursementTab;
}*/

export interface IDisbursementGeneral {
  amount: string;
  account: string;
  description: string;
  name: string;
  lastName: string;
  sex: string;
  type: string;
  identification: string;
  birthdate: string;
  phone: string;
  mail: string;
  city: string;
}

export interface IDisbursementExternal {
  amountExternal: string;
  bankExternal: string;
  typeExternal: string;
  accountExternal: string;
  descriptionExternal: string;
}

export interface IDisbursementInternal {
  amountInternal: string;
  toggleInternal: boolean;
  accountInternal: string;
  descriptionInternal: string;
  nameInternal: string;
  lastNameInternal: string;
  sexInternal: string;
  typeInternal: string;
  identificationInternal: string;
  birthdateInternal: string;
  phoneInternal: string;
  mailInternal: string;
  cityInternal: string;
}

export interface IDisbursementWithCheckEntity {
  amountCheckEntity: string;
  descriptionCheckEntity: string;
}

export interface IDisbursementWithCheckManagement {
  amountCheckManagement: string;
  descriptionCheckManagement: string;
}

export interface IDisbursementWithCash {
  amountCash: string;
  descriptionCash: string;
}
export interface FormData {
  contactInformation: ContactInformation;
  propertyOffered: IPropertyOffered;
  vehicleOffered: IVehicleOffered;
  disbursementGeneral: IDisbursementGeneral;
}

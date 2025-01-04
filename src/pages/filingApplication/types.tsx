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
export interface IDisbursementWithInternalAccount {
  amount: string;
  state: string;
  description: string;
}
export interface IPropertyOffered {
  antique: string;
  estimated: string;
  type: string;
  state: string;
  description: string;
}

export interface FormData {
  contactInformation: ContactInformation;
  propertyOffered: IPropertyOffered;
  vehicleOffered: IVehicleOffered;
  disbursementWithInternalAccount: IDisbursementWithInternalAccount;
}

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

export interface IBail {
  client: boolean;
}

export interface FormData {
  contactInformation: ContactInformation;
  propertyOffered: IPropertyOffered;
  vehicleOffered: IVehicleOffered;
  deptorData: {
    name: string;
    lastName: string;
    email: string;
    income: number;
    obligations: number;
  };
  bail: IBail;
}

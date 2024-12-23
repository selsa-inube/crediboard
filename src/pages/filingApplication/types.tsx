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

export interface FormData {
  contactInformation: {
    email: string;
    phone: string;
  };
  deptorData: {
    name: string;
    lastName: string;
    email: string;
    income: number;
    obligations: number;
  }
}

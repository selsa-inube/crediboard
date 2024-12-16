import { FormikProps } from "formik";

import { IIncome } from "@services/types";

import { IGeneralInformationEntry } from "./components/GeneralInformationForm";

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

export interface IOptionInitialiceEntry {
  id: string;
  value: string;
  isActive: boolean;
}

export interface IActions {
  [key: string]: React.ReactNode;
}

export interface IAction {
  id: string;
  actionName: string;
  content: (entry: IActions) => React.ReactNode;
}

export interface IPosition {
  [key: string]: React.ReactNode;
  Codigo: string;
  "Fecha-solicitud": string;
  Destino: string;
  Valor: string;
  Acciones?: string;
  n_roles?: string[];
}

export interface StepDetails {
  id: number;
  number: number;
  name: string;
  description: string;
}

export interface LoanConditionState {
  toggles: {
    quotaCapToggle: boolean;
    maximumTermToggle: boolean;
  };
  quotaCapValue: string;
  maximumTermValue: string;
}

export interface LoanAmountState {
  inputValue: string;
  toggleChecked: boolean;
  paymentPlan: string;
}

export interface FormData {
  selectedDestination: string;
  selectedProducts: string[];
  loanConditionState: {
    toggles: {
      quotaCapToggle: boolean;
      maximumTermToggle: boolean;
    };
    quotaCapValue: string;
    maximumTermValue: string;
  };
  generalToggleChecked: boolean;
  togglesState: boolean[];
  incomeData: IIncome;
  loanAmountState: {
    inputValue: string;
    toggleChecked: boolean;
    paymentPlan: string;
  };
  consolidatedCreditSelections: {
    totalCollected: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selectedValues: Record<string, any>;
  };
}

export interface IFormAddPosition {
  generalInformation: { isValid: boolean; values: IGeneralInformationEntry };
}

export interface IFormAddPositionRef {
  generalInformation: React.RefObject<FormikProps<IGeneralInformationEntry>>;
}

export type IHandleUpdateDataSwitchstep = IGeneralInformationEntry;

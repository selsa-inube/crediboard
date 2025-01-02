import { FormikValues } from "formik";

export interface FormValues {
  field1: number;
  field2: number;
}

export interface Option {
  id: string;
  label: string;
  value: string;
}

export interface IAddBorrowedProps {
  title: string;
  initialValues: FormikValues;
  formValues: FormValues;
  portalId?: string;
  handleClose: () => void;
  onSubmit: () => void;
  onConfirm: () => void;
  optionsFamily: Option[];
  optionsSex: Option[];
  optionsDocument: Option[];
}

export interface FormState {
  tipeOfDocument: string;
  documentNumber: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  sex: string;
  age: number;
  relation: string;
}

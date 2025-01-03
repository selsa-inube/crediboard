import { FormikValues } from "formik";

export interface FormValues {
  field2: number;
  field3: string;
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
  documentNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  sex: string;
  age: string;
  relation: string;
}

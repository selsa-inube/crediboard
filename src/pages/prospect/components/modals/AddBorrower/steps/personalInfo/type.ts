import { FormikValues } from "formik";

export interface Option {
  id: string;
  label: string;
  value: string;
}

export interface IAddBorrowedProps {
  title: string;
  initialValues: FormikValues;
  portalId?: string;
  handleClose?: () => void;
  onSubmit: () => void;
  onFormValid: (isValid: boolean) => void;
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

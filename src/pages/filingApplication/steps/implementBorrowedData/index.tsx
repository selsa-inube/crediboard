import { useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";



interface IBorrowedDataProps {
  isMobile: boolean;
  initialValues: {
    name: string;
    lastName: string;
    email: string;
    income: number;
    obligations: number;
  };
  onFormValid: (isValid: boolean) => void;
  handleOnChange: (values: {
    name: string;
    lastName: string;
    email: string;
    income: number;
    obligations: number;
  }) => void;
}
export function ImplementBorrowedData(props: IBorrowedDataProps) {
  const { isMobile, initialValues, onFormValid, handleOnChange } = props;


  const validationSchema = Yup.object({
    name: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().email().required(),
    income: Yup.number().required(),
    obligations: Yup.number().required(),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    validateOnMount: true,
    onSubmit: () => { },
  });

  const prevValues = useRef(formik.values);

  useEffect(() => {
    onFormValid(formik.isValid);
  }, [formik.isValid, onFormValid]);

  useEffect(() => {
    if (
      prevValues.current.name !== formik.values.name ||
      prevValues.current.lastName !== formik.values.lastName ||
      prevValues.current.email !== formik.values.email ||
      prevValues.current.income !== formik.values.income ||
      prevValues.current.obligations !== formik.values.obligations
    ) {
      handleOnChange(formik.values);
      prevValues.current = formik.values;
    }
  }, [formik.values, handleOnChange]);

  return (
    isMobile ? (<div></div>) : null
  );
}
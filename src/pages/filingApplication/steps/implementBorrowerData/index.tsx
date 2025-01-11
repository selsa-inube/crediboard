import { useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Grid } from "@inubekit/grid";

import { Fieldset } from "@components/data/Fieldset";
import { CardBorrowerNewData } from "@pages/prospect/components/cardNewBorrower";
import { dataImplementBorrowedData } from "./config";

import { Button } from "@inubekit/button";

interface borrowersProps {
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
export function Borrowers(props: borrowersProps) {
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
    onSubmit: () => {},
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
    <Fieldset>
      <Button variant="outlined">Agregar deudor</Button>
      <Grid
        templateColumns={
          isMobile
            ? "1fr"
            : `repeat(${dataImplementBorrowedData.length + 1}, 317px)`
        }
        autoRows="auto"
        padding={isMobile ? "4px 10px" : "10px 16px"}
        gap="20px"
      >
        {dataImplementBorrowedData.map((item, index) => (
          <CardBorrowerNewData
            key={index}
            title={item.borrower + ` ${index + 1}`}
            name={item.name}
            lastName={item.lastName}
            email={item.email}
            income={item.income}
            obligations={item.obligations}
          />
        ))}
        <CardBorrowerNewData hasData />
      </Grid>
    </Fieldset>
  );
}

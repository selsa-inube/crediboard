import { useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Grid } from "@inubekit/grid";
import { Textfield } from "@inubekit/inubekit";

import { CardGray } from "@components/cards/CardGray";
import { Fieldset } from "@components/data/Fieldset";
import { IContactInformation } from "@pages/SubmitCreditApplication/types";
import { mockContactInformation } from "@mocks/filing-application/contact-information/contactinformation.mock";

import { dataContactInformation } from "./config";

interface IContactInformationProps {
  onFormValid: (isValid: boolean) => void;
  handleOnChange: (values: IContactInformation) => void;
  isMobile: boolean;
  initialValues: IContactInformation;
}

export function ContactInformation(props: IContactInformationProps) {
  const { onFormValid, handleOnChange, isMobile, initialValues } = props;

  const data = mockContactInformation[0];

  const validationSchema = Yup.object({
    email: Yup.string()
      .matches(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/)
      .required(),
    phone: Yup.string()
      .matches(/^(\+\d{1,3})?\d{7,14}$/)
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      ...initialValues,
      document: data.document,
      documentNumber: data.documentNumber,
      name: data.name,
      lastName: data.lastName,
    },
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
      prevValues.current.email !== formik.values.email ||
      prevValues.current.phone !== formik.values.phone
    ) {
      handleOnChange(formik.values);
      prevValues.current = formik.values;
    }
  }, [formik.values, handleOnChange]);

  return (
    <Fieldset>
      <Grid
        templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"}
        autoRows="auto"
        padding={isMobile ? "4px 10px" : "10px 16px"}
        gap="20px"
      >
        <CardGray
          label={dataContactInformation.cardDocument}
          placeHolder={formik.values.document}
        />
        <CardGray
          label={dataContactInformation.cardDocumentNumber}
          placeHolder={formik.values.documentNumber}
        />
        <CardGray
          label={dataContactInformation.cardName}
          placeHolder={formik.values.name}
        />
        <CardGray
          label={dataContactInformation.cardLastName}
          placeHolder={formik.values.lastName}
        />
        <Textfield
          name="email"
          id="email"
          type="email"
          placeholder={dataContactInformation.placeEmail}
          label={dataContactInformation.cardEmail}
          size="compact"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullwidth
        />
        <Textfield
          name="phone"
          id="phone"
          type="number"
          placeholder={dataContactInformation.placePhone}
          label={dataContactInformation.cardPhone}
          size="compact"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullwidth
        />
      </Grid>
    </Fieldset>
  );
}

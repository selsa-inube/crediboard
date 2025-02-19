import { useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Grid } from "@inubekit/grid";
import { Textfield } from "@inubekit/textfield";

import { CardGray } from "@components/cards/CardGray";
import { Fieldset } from "@components/data/Fieldset";
import { IContactInformation } from "@pages/filingApplication/types";

import { dataContactInformation } from "./config";

interface IContactInformationProps {
  isMobile: boolean;
  initialValues: {
    email: string;
    phone: string;
  };
  onFormValid: (isValid: boolean) => void;
  handleOnChange: (values: IContactInformation) => void;
}

export function ContactInformation(props: IContactInformationProps) {
  const { isMobile, initialValues, onFormValid, handleOnChange } = props;

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    phone: Yup.number().required(),
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
          placeHolder={dataContactInformation.placeDocument}
        />
        <CardGray
          label={dataContactInformation.cardDocumentNumber}
          placeHolder={dataContactInformation.placeDocumentNumber}
        />
        <CardGray
          label={dataContactInformation.cardName}
          placeHolder={dataContactInformation.placeName}
        />
        <CardGray
          label={dataContactInformation.cardLastName}
          placeHolder={dataContactInformation.placeLastName}
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

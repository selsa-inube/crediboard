import { useState } from "react";
import { MdClear } from "react-icons/md";
import { Formik } from "formik";
import * as Yup from "yup";

import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { useMediaQuery } from "@inubekit/hooks";
import { Icon } from "@inubekit/icon";
import { Select } from "@inubekit/select";
import { Divider } from "@inubekit/divider";
import { Textfield } from "@inubekit/textfield";
import { Grid } from "@inubekit/grid";

import {
  StyledContainerClose,
  StyledModal,
  StyledContainerTitle,
} from "./styles";

import { IAddBorrowedProps, FormState } from "./type";
import {
  dataPersonalInfo,
  TipeOfDocument,
  TipeOfFamily,
  TipeOfSex,
} from "./config/personalInfo.config";

export const AddBorrower = (props: IAddBorrowedProps) => {
  const {
    title,

    initialValues,
    handleClose,
    onSubmit,
  } = props;

  const [form, setForm] = useState<FormState>({
    tipeOfDocument: "",
    documentNumber: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    sex: "",
    age: "",
    relation: "",
  });

  const onChange = (name: string, newValue: string) => {
    setForm({ ...form, [name]: newValue });
  };

  const handleNumberChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const isMobile = useMediaQuery("(max-width: 700px)");

  const validationSchema = Yup.object({
    TipeOfDocument: Yup.string().required(""),
    documentNumber: Yup.number().required(""),
    firstName: Yup.string().required(""),
    lastName: Yup.string().required(""),
    email: Yup.string().email("").required(""),
    phone: Yup.number().required(""),
    sex: Yup.string().required(""),
    age: Yup.number().min(0, "").required(""),
    relation: Yup.string().required(""),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={() => onSubmit()}
    >
      {(formik) => (
        <StyledModal $smallScreen={isMobile}>
          <StyledContainerTitle>
            <Text type="headline" size="small">
              {title}
            </Text>
            <StyledContainerClose onClick={handleClose}>
              <Stack alignItems="center" gap="10px">
                <Text>Cerrar</Text>
                <Icon
                  icon={<MdClear />}
                  size="24px"
                  cursorHover
                  appearance="dark"
                />
              </Stack>
            </StyledContainerClose>
          </StyledContainerTitle>
          <Divider />
          <Grid
            templateColumns="repeat(2,1fr)"
            gap="20px"
            height="auto"
            width="auto"
            autoRows="auto"
          >
            <Select
              id="tipeOfDocument"
              label={dataPersonalInfo.labelDocument}
              name="tipeOfDocument"
              onChange={onChange}
              onBlur={formik.handleBlur}
              options={TipeOfDocument}
              placeholder={dataPersonalInfo.placeHolderSelect}
              size="wide"
              value={form["tipeOfDocument"]}
              fullwidth
            />
            <Textfield
              id="documentNumber"
              label={dataPersonalInfo.labelNumber}
              placeholder={dataPersonalInfo.placeHolderNumber}
              fullwidth
              type="tel"
              onChange={(e) =>
                handleNumberChange("documentNumber", e.target.value)
              }
              value={form.documentNumber}
              size="wide"
            />
            <Textfield
              id="firstName"
              label={dataPersonalInfo.labelName}
              placeholder={dataPersonalInfo.placeHolderName}
              fullwidth
              type="text"
              onChange={(e) => handleNumberChange("firstName", e.target.value)}
              value={form.firstName}
              size="wide"
            />
            <Textfield
              id={dataPersonalInfo.labelLastName}
              label="apellidos"
              placeholder={dataPersonalInfo.labelLastName}
              fullwidth
              onChange={(e) => handleNumberChange("lastName", e.target.value)}
              type="text"
              value={form.lastName}
              size="wide"
            />
            <Textfield
              id="email"
              label={dataPersonalInfo.labelEmail}
              placeholder={dataPersonalInfo.placeHolderEmail}
              fullwidth
              type="email"
              onChange={(e) => handleNumberChange("email", e.target.value)}
              value={form.email}
              size="wide"
            />

            <Textfield
              id="phone"
              label={dataPersonalInfo.labelPhone}
              placeholder={dataPersonalInfo.placeHolderPhone}
              fullwidth
              type="tel"
              onChange={(e) => handleNumberChange("phone", e.target.value)}
              value={form.phone}
              size="wide"
            />
            <Select
              id="sex"
              label={dataPersonalInfo.labelSex}
              name="sex"
              options={TipeOfSex}
              placeholder={dataPersonalInfo.placeHolderSelect}
              size="wide"
              value={form["sex"]}
              onChange={onChange}
              onBlur={formik.handleBlur}
            />
            <Textfield
              id="dateOfBirth"
              label={dataPersonalInfo.labelDate}
              placeholder={dataPersonalInfo.placeHolderSelect}
              fullwidth
              type="number"
              onChange={(e) => handleNumberChange("age", e.target.value)}
              value={form.age}
              size="wide"
            />
            <Select
              id="relation"
              label={dataPersonalInfo.labelRelation}
              name="relation"
              options={TipeOfFamily}
              placeholder={dataPersonalInfo.placeHolderSelect}
              size="wide"
              value={form["relation"]}
              onChange={onChange}
            />
          </Grid>
          <Stack justifyContent="flex-end" padding="30px 0px">
            <Button
              children="Cancelar"
              appearance={"gray"}
              onClick={handleClose}
            />
            <Button
              children="Siguiente"
              appearance={"gray"}
              onClick={onSubmit}
            />
          </Stack>
        </StyledModal>
      )}
    </Formik>
  );
};

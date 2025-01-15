import { useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Select } from "@inubekit/select";
import { Input } from "@inubekit/input";
import { Grid } from "@inubekit/grid";
import { Datefield } from "@inubekit/datefield";
import { disbursemenOptionAccount } from "@pages/filingApplication/steps/disbursementGeneral/config";
import {
  Sex,
  typesOfDocuments,
  City,
} from "@mocks/filing-application/disbursement-general/disbursementgeneral.mock";

interface IGeneralInformationFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues?: any;
  onFormValid: (isValid: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleOnChange: (values: any) => void;
  optionNameForm: string;
}

export function GeneralInformationForm(props: IGeneralInformationFormProps) {
  const { initialValues, onFormValid, handleOnChange, optionNameForm } = props;
  const validationSchema = Yup.object({
    nameInternal: Yup.string().required(),
    amount: Yup.number().required(),
    description: Yup.string().required(),
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
      prevValues.current.sex !== formik.values.sex ||
      prevValues.current.type !== formik.values.type ||
      prevValues.current.identification !== formik.values.identification ||
      prevValues.current.birthdate !== formik.values.birthdate ||
      prevValues.current.phone !== formik.values.phone ||
      prevValues.current.mail !== formik.values.mail ||
      prevValues.current.city !== formik.values.city
    ) {
      handleOnChange(formik.values);
      prevValues.current = formik.values;
    }
  }, [formik.values, handleOnChange]);

  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap="16px" autoRows="auto">
        <Input
          id={"name" + optionNameForm}
          name={"name" + optionNameForm}
          label={disbursemenOptionAccount.labelName}
          placeholder={disbursemenOptionAccount.placeName}
          value={formik.values["name" + optionNameForm]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullwidth={true}
          size="compact"
        ></Input>
        <Input
          id={"lastName" + optionNameForm}
          label={disbursemenOptionAccount.labelLastName}
          placeholder={disbursemenOptionAccount.placeLastName}
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullwidth={true}
          size="compact"
        ></Input>
        <Select
          id={"sex" + optionNameForm}
          name={"sex" + optionNameForm}
          label={disbursemenOptionAccount.labelSex}
          placeholder={disbursemenOptionAccount.placeOption}
          size="compact"
          options={Sex}
          onBlur={formik.handleBlur}
          onChange={(name, value) => formik.setFieldValue(name, value)}
          value={formik.values.sex}
          fullwidth
        />
        <Select
          id={"type" + optionNameForm}
          name={"type" + optionNameForm}
          label={disbursemenOptionAccount.labelDocumentType}
          placeholder={disbursemenOptionAccount.placeOption}
          size="compact"
          options={typesOfDocuments}
          onBlur={formik.handleBlur}
          onChange={(name, value) => formik.setFieldValue(name, value)}
          value={formik.values.type}
          fullwidth
        />
        <Input
          id={"identification" + optionNameForm}
          label={disbursemenOptionAccount.labelDocumentNumber}
          placeholder={disbursemenOptionAccount.placeDocumentNumber}
          value={formik.values.identification}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullwidth={true}
          size="compact"
        ></Input>
        <Datefield
          id={"birthdate" + optionNameForm}
          label={disbursemenOptionAccount.labelBirthdate}
          size="compact"
          fullwidth={true}
        ></Datefield>
        <Input
          id={"phone" + optionNameForm}
          label={disbursemenOptionAccount.labelphone}
          placeholder={disbursemenOptionAccount.placephone}
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullwidth={true}
          size="compact"
        ></Input>
        <Input
          id={"mail" + optionNameForm}
          label={disbursemenOptionAccount.labelMail}
          placeholder={disbursemenOptionAccount.placeMail}
          value={formik.values.mail}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullwidth={true}
          size="compact"
        ></Input>
        <Select
          id={"city" + optionNameForm}
          name={"city" + optionNameForm}
          label={disbursemenOptionAccount.labelCity}
          placeholder={disbursemenOptionAccount.placeOption}
          size="compact"
          options={City}
          onBlur={formik.handleBlur}
          onChange={(name, value) => formik.setFieldValue(name, value)}
          value={formik.values.city}
          fullwidth
        />
      </Grid>
    </>
  );
}

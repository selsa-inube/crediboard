import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Checkbox } from "@inubekit/checkbox";
import { Divider } from "@inubekit/divider";
import { Toggle } from "@inubekit/toggle";
import { Select } from "@inubekit/select";
import { Stack } from "@inubekit/stack";
import { Textarea } from "@inubekit/textarea";
import { Textfield } from "@inubekit/textfield";
import { Text } from "@inubekit/text";
import { Input } from "@inubekit/input";

import {
  Bank,
  typeAccount,
} from "@mocks/filing-application/disbursement-general/disbursementgeneral.mock";
import {
  handleChangeWithCurrency,
  validateCurrencyField,
} from "@utils/formatData/currency";
import {
  disbursementGeneral,
  disbursemenOptionAccount,
} from "@pages/filingApplication/steps/disbursementGeneral/config";
//import { GeneralInformationForm } from "@pages/filingApplication/components/GeneralInformationForm";
import { IDisbursementExternal } from "@pages/filingApplication/types";

interface IDisbursementWithExternalAccountProps {
  isMobile: boolean;
  initialValues: IDisbursementExternal;
  onFormValid: (isValid: boolean) => void;
  handleOnChange: (values: IDisbursementExternal) => void;
  optionNameForm: string;
}

export function DisbursementWithExternalAccount(
  props: IDisbursementWithExternalAccountProps
) {
  const {
    isMobile,
    initialValues,
    onFormValid,
    handleOnChange,
    optionNameForm,
  } = props;

  const [isFeatureEnabled, setIsFeatureEnabled] = useState(false);
  const [isFeatureIndeterminate, setIsFeatureIndeterminate] = useState(false);
  const [toggleChecked, setToggleChecked] = useState(true);

  const validationSchema = Yup.object({
    amountExternal: Yup.number().required(),
    bankExternal: Yup.string().required(),
    typeExternal: Yup.string().required(),
    accountExternal: Yup.string().required(),
    descriptionExternal: Yup.string().required(),
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
      prevValues.current.amountExternal !== formik.values.amountExternal ||
      prevValues.current.bankExternal !== formik.values.bankExternal ||
      prevValues.current.typeExternal !== formik.values.typeExternal ||
      prevValues.current.accountExternal !== formik.values.accountExternal ||
      prevValues.current.descriptionExternal !==
        formik.values.descriptionExternal
    ) {
      handleOnChange(formik.values);
      prevValues.current = formik.values;
    }
  }, [formik.values, handleOnChange]);

  const handleCheckboxChange = (event: { target: { checked: boolean } }) => {
    if (isFeatureIndeterminate) {
      setIsFeatureEnabled(!isFeatureEnabled);
      setIsFeatureIndeterminate(false);
    }
    {
      setIsFeatureEnabled(event.target.checked);
    }
  };

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToggleChecked(e.target.checked);
  };

  return (
    <Stack
      direction="column"
      padding={isMobile ? "4px 10px" : "10px 16px"}
      gap="10px"
      justifyContent="center"
    >
      <Stack direction="column" gap="20px">
        <Textfield
          id={"amount" + optionNameForm}
          name={"amount" + optionNameForm}
          label={disbursementGeneral.label}
          placeholder={disbursementGeneral.place}
          size="compact"
          value={validateCurrencyField("amountExternal", formik)}
          onChange={(e) => handleChangeWithCurrency(formik, e)}
          onBlur={formik.handleBlur}
          fullwidth
        />
        <Stack gap="10px" direction="row" alignItems="center">
          <Checkbox
            id={"featureCheckbox" + optionNameForm}
            name={"featureCheckbox" + optionNameForm}
            checked={isFeatureEnabled}
            indeterminate={isFeatureIndeterminate}
            onChange={handleCheckboxChange}
            value={"featureCheckbox"}
          />
          <Text type="label" size="medium">
            {disbursementGeneral.labelCheck}
          </Text>
        </Stack>
      </Stack>
      <Divider dashed />
      <Stack direction="column" gap="16px">
        <Text type="label" size="medium">
          {disbursementGeneral.labelToggle}
        </Text>
      </Stack>
      <Stack direction="row" gap="16px">
        <Toggle
          checked={toggleChecked}
          disabled={false}
          id="toggleSwitch"
          margin="0px"
          name="toggleFeature"
          onChange={handleToggleChange}
          padding="0px"
          size="large"
          value="switchTest1"
        />
        <Text appearance={toggleChecked ? "success" : "danger"}>
          {toggleChecked
            ? disbursementGeneral.optionToggleYes
            : disbursementGeneral.optionToggleNo}
        </Text>
      </Stack>
      <Divider dashed />
      {/* {!toggleChecked && (
        <>
          <GeneralInformationForm
            onFormValid={onFormValid}
            initialValues={initialValues}
            handleOnChange={handleOnChange}
          />
          <Divider dashed />
        </>
      )} */}
      <Stack direction="row" gap="16px">
        <Select
          id={"bank" + optionNameForm}
          name={"bank" + optionNameForm}
          label={disbursemenOptionAccount.labelBank}
          placeholder={disbursemenOptionAccount.placeOption}
          size="compact"
          options={Bank}
          onBlur={formik.handleBlur}
          onChange={(name, value) => formik.setFieldValue(name, value)}
          value={formik.values.bankExternal}
          fullwidth
        />
        <Select
          id={"type" + optionNameForm}
          name={"type" + optionNameForm}
          label={disbursemenOptionAccount.labelAccountType}
          placeholder={disbursemenOptionAccount.placeOption}
          size="compact"
          options={typeAccount}
          onBlur={formik.handleBlur}
          onChange={(name, value) => formik.setFieldValue(name, value)}
          value={formik.values.typeExternal}
          fullwidth
        />
        <Input
          id={"account" + optionNameForm}
          label={disbursemenOptionAccount.labelAccountNumber}
          placeholder={disbursemenOptionAccount.placeAccountNumber}
          value={formik.values.accountExternal}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullwidth={true}
          size="compact"
        ></Input>
      </Stack>
      <Textarea
        id={"description" + optionNameForm}
        name={"description" + optionNameForm}
        label={disbursemenOptionAccount.observation}
        placeholder={disbursemenOptionAccount.placeObservation}
        value={formik.values.descriptionExternal}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        fullwidth
      />
    </Stack>
  );
}

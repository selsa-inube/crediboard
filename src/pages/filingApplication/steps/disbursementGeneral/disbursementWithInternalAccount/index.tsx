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

import { optionLocalAccount } from "@mocks/filing-application/disbursement-general/disbursementgeneral.mock";
import {
  handleChangeWithCurrency,
  validateCurrencyField,
} from "@utils/formatData/currency";

import { IDisbursementInternal } from "@pages/filingApplication/types";
import {
  disbursementGeneral,
  disbursemenOptionAccount,
} from "@pages/filingApplication/steps/disbursementGeneral/config";
import { GeneralInformationForm } from "@pages/filingApplication/components/GeneralInformationForm";

interface IDisbursementGeneralProps {
  isMobile: boolean;
  initialValues: IDisbursementInternal;
  onFormValid: (isValid: boolean) => void;
  handleOnChange: (values: IDisbursementInternal) => void;
  optionNameForm: string;
}

export function DisbursementWithInternalAccount(
  props: IDisbursementGeneralProps
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
    amountInternal: Yup.number().required(),
    accountInternal: Yup.string().required(),
    descriptionInternal: Yup.string().required(),
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
      prevValues.current.amountInternal !== formik.values.amountInternal ||
      prevValues.current.toggleInternal !== formik.values.toggleInternal ||
      prevValues.current.accountInternal !== formik.values.accountInternal ||
      prevValues.current.descriptionInternal !==
        formik.values.descriptionInternal
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
          value={validateCurrencyField("amountInternal", formik)}
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
          id={"toggle" + optionNameForm}
          name={"toggle" + optionNameForm}
          checked={toggleChecked}
          disabled={false}
          margin="0px"
          onChange={handleToggleChange}
          padding="0px"
          size="large"
          value="toggle"
        />
        <Text appearance={toggleChecked ? "success" : "danger"}>
          {toggleChecked
            ? disbursementGeneral.optionToggleYes
            : disbursementGeneral.optionToggleNo}
        </Text>
      </Stack>
      <Divider dashed />
      {!toggleChecked && (
        <>
          <GeneralInformationForm
            onFormValid={onFormValid}
            initialValues={initialValues}
            handleOnChange={handleOnChange}
            optionNameForm={optionNameForm}
          />
          <Divider dashed />
        </>
      )}
      <Select
        id={"account" + optionNameForm}
        name={"account" + optionNameForm}
        label={disbursemenOptionAccount.labelAccount}
        placeholder={disbursemenOptionAccount.placeOption}
        size="compact"
        options={optionLocalAccount}
        onBlur={formik.handleBlur}
        onChange={(name, value) => formik.setFieldValue(name, value)}
        value={formik.values.accountInternal}
        fullwidth
      />
      <Textarea
        id={"description" + optionNameForm}
        name={"description" + optionNameForm}
        label={disbursemenOptionAccount.observation}
        placeholder={disbursemenOptionAccount.placeObservation}
        value={formik.values.descriptionInternal}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        fullwidth
      />
    </Stack>
  );
}

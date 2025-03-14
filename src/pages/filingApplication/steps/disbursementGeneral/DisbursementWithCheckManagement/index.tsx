import { useEffect, useRef } from "react";
import { Checkbox } from "@inubekit/checkbox";
import { Toggle } from "@inubekit/toggle";
import { Stack, Text, Divider } from "@inubekit/inubekit";
import { Textarea } from "@inubekit/textarea";
import { Textfield } from "@inubekit/textfield";

import {
  handleChangeWithCurrency,
  validateCurrencyField,
} from "@utils/formatData/currency";
import {
  disbursementGeneral,
  disbursemenOptionAccount,
} from "@pages/filingApplication/steps/disbursementGeneral/config";
import { GeneralInformationForm } from "@pages/filingApplication/components/GeneralInformationForm";
import { IDisbursementGeneral } from "@pages/filingApplication/types";

interface IDisbursementWithCheckManagementProps {
  isMobile: boolean;
  initialValues: IDisbursementGeneral;
  onFormValid: (isValid: boolean) => void;
  handleOnChange: (values: IDisbursementGeneral) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any;
  optionNameForm: string;
}

export function DisbursementWithCheckManagement(
  props: IDisbursementWithCheckManagementProps
) {
  const {
    isMobile,
    initialValues,
    onFormValid,
    handleOnChange,
    formik,
    optionNameForm,
  } = props;

  const prevValues = useRef(formik.values[optionNameForm]);

  useEffect(() => {
    onFormValid(formik.isValid);
  }, [formik.isValid, onFormValid]);

  useEffect(() => {
    if (formik.values[optionNameForm]) {
      const updatedValues = {
        ...initialValues,
        [optionNameForm]: { ...formik.values[optionNameForm] },
      };

      if (
        JSON.stringify(prevValues.current) !==
        JSON.stringify(formik.values[optionNameForm])
      ) {
        handleOnChange(updatedValues as IDisbursementGeneral);
        prevValues.current = { ...formik.values[optionNameForm] };
      }
    }
  }, [formik.values, handleOnChange, initialValues, optionNameForm]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(`${optionNameForm}.check`, event.target.checked);
  };

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(`${optionNameForm}.toggle`, event.target.checked);
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
          id={"amount"}
          name={"amount"}
          label={disbursementGeneral.label}
          placeholder={disbursementGeneral.place}
          size="compact"
          value={validateCurrencyField("amount", formik, true, optionNameForm)}
          onChange={(e) => {
            handleChangeWithCurrency(formik, e, optionNameForm);
          }}
          onBlur={formik.handleBlur}
          fullwidth
        />
        <Stack gap="10px" direction="row" alignItems="center">
          <Checkbox
            id={"featureCheckbox"}
            name={"featureCheckbox"}
            checked={formik.values[optionNameForm]?.check}
            indeterminate={false}
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
          id="toggle"
          name="toggle"
          checked={formik.values[optionNameForm]?.toggle}
          disabled={false}
          margin="0px"
          onChange={handleToggleChange}
          padding="0px"
          size="large"
          value="toggle"
        />
        <Text
          appearance={
            formik.values[optionNameForm]?.toggle ? "success" : "danger"
          }
        >
          {formik.values[optionNameForm]?.toggle
            ? disbursementGeneral.optionToggleYes
            : disbursementGeneral.optionToggleNo}
        </Text>
      </Stack>
      <Divider dashed />
      {!formik.values[optionNameForm]?.toggle && (
        <>
          <GeneralInformationForm
            formik={formik}
            optionNameForm={optionNameForm}
          />
          <Divider dashed />
        </>
      )}
      <Stack direction="row" gap="16px">
        <Textarea
          id={"description"}
          name={`${optionNameForm}.description`}
          label={disbursemenOptionAccount.observation}
          placeholder={disbursemenOptionAccount.placeObservation}
          value={formik.values[optionNameForm]?.description || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullwidth
        />
      </Stack>
    </Stack>
  );
}

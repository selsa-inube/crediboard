import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Checkbox } from "@inubekit/checkbox";
import { Divider } from "@inubekit/divider";
import { Toggle } from "@inubekit/toggle";
import { Stack } from "@inubekit/stack";
import { Textarea } from "@inubekit/textarea";
import { Textfield } from "@inubekit/textfield";
import { Text } from "@inubekit/text";

import {
  handleChangeWithCurrency,
  validateCurrencyField,
} from "@utils/formatData/currency";
import {
  disbursementGeneral,
  disbursemenOptionAccount,
} from "@pages/filingApplication/steps/disbursementGeneral/config";
//import { GeneralInformationForm } from "@pages/filingApplication/components/GeneralInformationForm";
import { IDisbursementWithCash } from "@pages/filingApplication/types";

interface IDisbursementWithCashProps {
  isMobile: boolean;
  initialValues: IDisbursementWithCash;
  onFormValid: (isValid: boolean) => void;
  handleOnChange: (values: IDisbursementWithCash) => void;
  optionNameForm: string;
}

export function DisbursementWithCash(props: IDisbursementWithCashProps) {
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
    amountCash: Yup.number().required(),
    descriptionCash: Yup.string().required(),
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
      prevValues.current.amountCash !== formik.values.amountCash ||
      prevValues.current.descriptionCash !== formik.values.descriptionCash
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
          value={validateCurrencyField("amountCash", formik)}
          onChange={(e) => handleChangeWithCurrency(formik, e)}
          onBlur={formik.handleBlur}
          fullwidth
        />
        <Stack gap="10px" direction="row" alignItems="center">
          <Checkbox
            id={"featureCheckbox" + optionNameForm}
            name={"feature" + optionNameForm}
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
        <Textarea
          id={"description" + optionNameForm}
          name={"description" + optionNameForm}
          label={disbursemenOptionAccount.observation}
          placeholder={disbursemenOptionAccount.placeObservation}
          value={formik.values.descriptionCash}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullwidth
        />
      </Stack>
    </Stack>
  );
}

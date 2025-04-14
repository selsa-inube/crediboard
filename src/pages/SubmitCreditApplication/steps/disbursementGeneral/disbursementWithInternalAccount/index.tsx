import { useEffect, useRef, useState } from "react";
import { Checkbox } from "@inubekit/checkbox";
import { Toggle } from "@inubekit/toggle";
import { Select } from "@inubekit/select";
import { Stack, Text, Divider, useFlag } from "@inubekit/inubekit";
import { Textarea } from "@inubekit/textarea";
import { Textfield } from "@inubekit/textfield";
import {
  handleChangeWithCurrency,
  validateCurrencyField,
} from "@utils/formatData/currency";
import { IDisbursementGeneral } from "@pages/SubmitCreditApplication/types";
import {
  disbursementGeneral,
  disbursemenOptionAccount,
} from "@pages/SubmitCreditApplication/steps/disbursementGeneral/config";
import { GeneralInformationForm } from "@pages/SubmitCreditApplication/components/GeneralInformationForm";
import { getAllInternalAccounts } from "@services/integrationInternalAccounts";

interface IDisbursementWithInternalAccountProps {
  isMobile: boolean;
  initialValues: IDisbursementGeneral;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any;
  optionNameForm: string;
  identificationNumber: string;
  onFormValid: (isValid: boolean) => void;
  handleOnChange: (values: IDisbursementGeneral) => void;
  getTotalAmount: () => number;
}

export function DisbursementWithInternalAccount(
  props: IDisbursementWithInternalAccountProps
) {
  const {
    isMobile,
    initialValues,
    formik,
    optionNameForm,
    identificationNumber,
    getTotalAmount,
    onFormValid,
    handleOnChange,
  } = props;

  const prevValues = useRef(formik.values[optionNameForm]);
  const [accountOptions, setAccountOptions] = useState<
    { id: string; label: string; value: string }[]
  >([]);

  const { addFlag } = useFlag();

  const handleFlag = (error: unknown) => {
    addFlag({
      title: `${disbursemenOptionAccount.errorFlagInternal}`,
      description: `Error: ${error}`,
      appearance: "danger",
      duration: 5000,
    });
  };

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

  const totalAmount = getTotalAmount();
  const isDisabled = totalAmount >= initialValues.amount;

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    formik.setFieldValue(`${optionNameForm}.check`, isChecked);

    if (isChecked) {
      const remainingAmount = initialValues.amount - totalAmount;

      if (remainingAmount > 0) {
        const currentAmount = Number(
          formik.values[optionNameForm]?.amount || 0
        );
        const newAmount = currentAmount + remainingAmount;

        formik.setFieldValue(`${optionNameForm}.amount`, newAmount);
      }
    }
  };

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(`${optionNameForm}.toggle`, event.target.checked);
  };

  useEffect(() => {
    const currentAmount = Number(formik.values[optionNameForm]?.amount || 0);
    const totalAmount = props.getTotalAmount();

    if (currentAmount + totalAmount - currentAmount !== initialValues.amount) {
      formik.setFieldValue(`${optionNameForm}.check`, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values[optionNameForm]?.amount]);

  useEffect(() => {
    async function fetchAccounts() {
      try {
        const response = await getAllInternalAccounts(identificationNumber);
        const options = response.map((account) => ({
          id: account.savingProductNumber,
          label: `${account.productDescription} - ${account.savingProductCode}`,
          value: account.savingProductNumber,
        }));
        setAccountOptions(options);
      } catch (error) {
        handleFlag(error);
        console.error("Error fetching internal accounts:", error);
      }
    }

    fetchAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identificationNumber]);

  return (
    <Stack
      direction="column"
      padding={isMobile ? "4px 10px" : "10px 16px"}
      gap="10px"
      justifyContent="center"
    >
      <Stack direction="column" gap="20px">
        <Textfield
          id="amount"
          name="amount"
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
            id="featureCheckbox"
            name="featureCheckbox"
            checked={formik.values[optionNameForm]?.check}
            indeterminate={false}
            onChange={handleCheckboxChange}
            value="featureCheckbox"
            disabled={isDisabled}
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
      <Select
        id={`${optionNameForm}.account`}
        name={`${optionNameForm}.account`}
        label={disbursemenOptionAccount.labelAccount}
        placeholder={disbursemenOptionAccount.placeOption}
        size="compact"
        options={accountOptions}
        onBlur={formik.handleBlur}
        onChange={(_, value) =>
          formik.setFieldValue(`${optionNameForm}.account`, value)
        }
        value={formik.values[optionNameForm]?.account || ""}
        fullwidth
      />
      <Textarea
        id={`${optionNameForm}.description`}
        name={`${optionNameForm}.description`}
        label={disbursemenOptionAccount.observation}
        placeholder={disbursemenOptionAccount.placeObservation}
        value={formik.values[optionNameForm]?.description || ""}
        onChange={(e) =>
          formik.setFieldValue(`${optionNameForm}.description`, e.target.value)
        }
        onBlur={formik.handleBlur}
        fullwidth
      />
    </Stack>
  );
}

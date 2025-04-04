import { useEffect, useRef, useState } from "react";
import { Checkbox } from "@inubekit/checkbox";
import { Divider } from "@inubekit/divider";
import { Toggle } from "@inubekit/toggle";
import { Select } from "@inubekit/select";
import { Stack } from "@inubekit/stack";
import { Textarea } from "@inubekit/textarea";
import { Textfield } from "@inubekit/textfield";
import { Text } from "@inubekit/text";
import { Input } from "@inubekit/input";

import { typeAccount } from "@mocks/filing-application/disbursement-general/disbursementgeneral.mock";
import {
  handleChangeWithCurrency,
  validateCurrencyField,
} from "@utils/formatData/currency";
import {
  disbursementGeneral,
  disbursemenOptionAccount,
} from "@pages/SubmitCreditApplication/steps/disbursementGeneral/config";
import { GeneralInformationForm } from "@pages/SubmitCreditApplication/components/GeneralInformationForm";
import {
  IDisbursementGeneral,
  IOptionsSelect,
} from "@pages/SubmitCreditApplication/types";
import { getAllBancks } from "@services/banckAccount";

interface IDisbursementWithExternalAccountProps {
  isMobile: boolean;
  initialValues: IDisbursementGeneral;
  onFormValid: (isValid: boolean) => void;
  handleOnChange: (values: IDisbursementGeneral) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any;
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
    formik,
    optionNameForm,
  } = props;

  const prevValues = useRef(formik.values[optionNameForm]);

  const [banks, setBanks] = useState<IOptionsSelect[]>([]);

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

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await getAllBancks();
        const formattedBanks = response.map((bank) => ({
          id: bank.bankId,
          label: bank.bankName,
          value: bank.bankName,
        }));
        setBanks(formattedBanks);
      } catch (error) {
        console.error("Error al cargar los bancos:", error);
      }
    };

    fetchBanks();
  }, []);

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
        <Select
          id={"bank"}
          name={`${optionNameForm}.bank`}
          label={disbursemenOptionAccount.labelBank}
          placeholder={disbursemenOptionAccount.placeOption}
          size="compact"
          options={banks}
          onBlur={formik.handleBlur}
          onChange={(name, value) => formik.setFieldValue(name, value)}
          value={formik.values[optionNameForm]?.bank || ""}
          fullwidth
        />
        <Select
          id={"accountType"}
          name={`${optionNameForm}.accountType`}
          label={disbursemenOptionAccount.labelAccountType}
          placeholder={disbursemenOptionAccount.placeOption}
          size="compact"
          options={typeAccount}
          onBlur={formik.handleBlur}
          onChange={(name, value) => formik.setFieldValue(name, value)}
          value={formik.values[optionNameForm]?.accountType || ""}
          fullwidth
        />
        <Input
          id={"accountNumber"}
          name={`${optionNameForm}.accountNumber`}
          label={disbursemenOptionAccount.labelAccountNumber}
          placeholder={disbursemenOptionAccount.placeAccountNumber}
          value={formik.values[optionNameForm]?.accountNumber || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullwidth={true}
          size="compact"
        ></Input>
      </Stack>
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
  );
}

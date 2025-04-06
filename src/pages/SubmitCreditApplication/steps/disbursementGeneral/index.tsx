import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { Tabs } from "@inubekit/tabs";
import { Stack } from "@inubekit/stack";
import { Fieldset } from "@components/data/Fieldset";

import { disbursemenTabs } from "./config";
import { DisbursementWithInternalAccount } from "./disbursementWithInternalAccount/index";
import { DisbursementWithExternalAccount } from "./disbursementWithExternalAccount";
import { DisbursementWithCheckEntity } from "./disbursementWithCheckEntity";
import { DisbursementWithCheckManagement } from "./DisbursementWithCheckManagement";
import { DisbursementWithCash } from "./DisbursementWithCash";

interface IDisbursementGeneralProps {
  isMobile: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues: any;
  isSelected: string;
  onFormValid: (isValid: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleOnChange: (values: any) => void;
  handleTabChange: (id: string) => void;
}

export function DisbursementGeneral(props: IDisbursementGeneralProps) {
  const {
    isMobile,
    initialValues,
    isSelected,
    onFormValid,
    handleOnChange,
    handleTabChange,
  } = props;

  const [tabChanged, setTabChanged] = useState(false);

  const formik = useFormik({
    initialValues: initialValues,
    validateOnMount: true,
    onSubmit: () => {},
  });

  useEffect(() => {
    handleOnChange(formik.values);
  }, [formik.values, handleOnChange]);

  const getTotalAmount = useCallback(() => {
    const disbursementForms = [
      "Internal",
      "External",
      "CheckEntity",
      "CheckManagement",
      "Cash",
    ];

    return disbursementForms.reduce((total, key) => {
      const amount = formik.values[key]?.amount || 0;
      return total + Number(amount);
    }, 0);
  }, [formik.values]);

  useEffect(() => {
    setTabChanged((prev) => !prev);
  }, [isSelected]);

  useEffect(() => {
    const totalAmount = getTotalAmount();
    onFormValid(totalAmount === initialValues.amount);
  }, [
    formik.values,
    onFormValid,
    tabChanged,
    getTotalAmount,
    initialValues.amount,
  ]);

  return (
    <Fieldset>
      <Stack
        direction="column"
        padding={isMobile ? "4px 10px" : "10px 16px"}
        gap="20px"
      >
        <Stack direction="column">
          <Tabs
            tabs={Object.values(disbursemenTabs)}
            selectedTab={isSelected}
            onChange={handleTabChange}
            scroll={isMobile}
          />
          {isSelected === disbursemenTabs.internal.id && (
            <DisbursementWithInternalAccount
              isMobile={isMobile}
              onFormValid={onFormValid}
              initialValues={initialValues}
              handleOnChange={handleOnChange}
              formik={formik}
              optionNameForm="Internal"
              getTotalAmount={getTotalAmount}
            />
          )}
          {isSelected === disbursemenTabs.external.id && (
            <DisbursementWithExternalAccount
              isMobile={isMobile}
              onFormValid={onFormValid}
              initialValues={initialValues}
              handleOnChange={handleOnChange}
              formik={formik}
              optionNameForm="External"
              getTotalAmount={getTotalAmount}
            />
          )}
          {isSelected === disbursemenTabs.check.id && (
            <DisbursementWithCheckEntity
              isMobile={isMobile}
              onFormValid={onFormValid}
              initialValues={initialValues}
              handleOnChange={handleOnChange}
              formik={formik}
              optionNameForm="CheckEntity"
              getTotalAmount={getTotalAmount}
            />
          )}
          {isSelected === disbursemenTabs.management.id && (
            <DisbursementWithCheckManagement
              isMobile={isMobile}
              onFormValid={onFormValid}
              initialValues={initialValues}
              handleOnChange={handleOnChange}
              formik={formik}
              optionNameForm="CheckManagement"
              getTotalAmount={getTotalAmount}
            />
          )}
          {isSelected === disbursemenTabs.cash.id && (
            <DisbursementWithCash
              isMobile={isMobile}
              onFormValid={onFormValid}
              initialValues={initialValues}
              handleOnChange={handleOnChange}
              formik={formik}
              optionNameForm="Cash"
              getTotalAmount={getTotalAmount}
            />
          )}
        </Stack>
      </Stack>
    </Fieldset>
  );
}

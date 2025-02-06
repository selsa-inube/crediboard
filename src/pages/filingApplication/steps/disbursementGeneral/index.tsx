import { useFormik } from "formik";
import { useEffect } from "react";
import { Tabs } from "@inubekit/tabs";
import { Stack } from "@inubekit/stack";
import { Fieldset } from "@components/data/Fieldset";

import { disbursemenTabs } from "./config";
import { DisbursementWithInternalAccount } from "./disbursementWithInternalAccount/index";
import { DisbursementWithExternalAccount } from "./disbursementWithExternalAccount";
import { DisbursementWithCheckEntity } from "./disbursementWithCheckEntity ";
import { DisbursementWithCheckManagement } from "./DisbursementWithCheckManagement";
import { DisbursementWithCash } from "./DisbursementWithCash";

interface IDisbursementGeneralProps {
  isMobile: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues: any;
  onFormValid: (isValid: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleOnChange: (values: any) => void;
  isSelected: string;
  handleTabChange: (id: string) => void;
}

export function DisbursementGeneral(props: IDisbursementGeneralProps) {
  const {
    isMobile,
    initialValues,
    onFormValid,
    handleOnChange,
    isSelected,
    handleTabChange,
  } = props;

  const formik = useFormik({
    initialValues: initialValues,
    validateOnMount: true,
    onSubmit: () => {},
  });

  useEffect(() => {
    handleOnChange(formik.values);
  }, [formik.values, handleOnChange]);

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
          />
          {isSelected === disbursemenTabs.internal.id && (
            <DisbursementWithInternalAccount
              isMobile={isMobile}
              onFormValid={onFormValid}
              initialValues={initialValues}
              handleOnChange={handleOnChange}
              formik={formik}
              optionNameForm="Internal"
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
            />
          )}
        </Stack>
      </Stack>
    </Fieldset>
  );
}

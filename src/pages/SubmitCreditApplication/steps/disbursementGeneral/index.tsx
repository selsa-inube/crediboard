import { useFormik } from "formik";
import { useEffect, useContext, useState, useRef, useCallback } from "react";
import { Tabs } from "@inubekit/tabs";
import { Stack } from "@inubekit/inubekit";
import { Fieldset } from "@components/data/Fieldset";
import { postBusinessUnitRules } from "@services/businessUnitRules";
import { AppContext } from "@context/AppContext";
import { CustomerContext } from "@context/CustomerContext";
import { ruleConfig } from "@pages/SubmitCreditApplication/config/configRules";
import { evaluateRule } from "@pages/SubmitCreditApplication/evaluateRule";

import { DisbursementWithInternalAccount } from "./disbursementWithInternalAccount/index";
import { DisbursementWithExternalAccount } from "./disbursementWithExternalAccount";
import { DisbursementWithCheckEntity } from "./disbursementWithCheckEntity";
import { DisbursementWithCheckManagement } from "./DisbursementWithCheckManagement";
import { DisbursementWithCash } from "./DisbursementWithCash";
import { disbursemenTabs } from "./config";

interface IDisbursementGeneralProps {
  isMobile: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues: any;
  onFormValid: (isValid: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleOnChange: (values: any) => void;
  isSelected: string;
  handleTabChange: (id: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export function DisbursementGeneral(props: IDisbursementGeneralProps) {
  const {
    isMobile,
    initialValues,
    onFormValid,
    handleOnChange,
    isSelected,
    handleTabChange,
    data,
  } = props;

  const formik = useFormik({
    initialValues,
    validateOnMount: true,
    onSubmit: () => {},
  });

  interface Tab {
    id: string;
    disabled: boolean;
    label: string;
  }

  const { businessUnitSigla } = useContext(AppContext);
  const { customerData } = useContext(CustomerContext);
  const userHasChangedTab = useRef(false);

  const [validTabs, setValidTabs] = useState<Tab[]>([]);

  const businessUnitPublicCode: string =
    JSON.parse(businessUnitSigla).businessUnitPublicCode;

  useEffect(() => {
    handleOnChange(formik.values);
  }, [formik.values, handleOnChange]);

  const fetchTabs = useCallback(async () => {
    try {
      if (!data?.requested_amount || !data.credit_products?.length) return;
      const dataRules = {
        LineOfCredit:
          data.credit_products?.[0]?.line_of_credit_abbreviated_name,
        ClientType:
          customerData.generalAttributeClientNaturalPersons?.[0]?.associateType?.substring(
            0,
            1
          ) || "",
        LoanAmount: data.requested_amount,
      };

      const rule = ruleConfig["ModeOfDisbursementType"]?.(dataRules);
      if (!rule) return;

      const values = await evaluateRule(
        rule,
        (code, data) => postBusinessUnitRules(code, data),
        "value",
        businessUnitPublicCode
      );

      const validDisbursements =
        Array.isArray(values) && typeof values[0] === "string"
          ? values
          : values.map((item) => item.value);

      const allTabs = Object.values(disbursemenTabs);

      const availableTabs = allTabs.filter((tab) =>
        validDisbursements.includes(tab.id)
      );

      setValidTabs(availableTabs);

      if (availableTabs.length > 0 && !userHasChangedTab.current) {
        handleTabChange(availableTabs[0].id);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  }, [
    businessUnitPublicCode,
    customerData.generalAttributeClientNaturalPersons,
    data.credit_products,
    data.requested_amount,
    handleTabChange,
  ]);

  useEffect(() => {
    fetchTabs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleManualTabChange = (tabId: string) => {
    userHasChangedTab.current = true;
    handleTabChange(tabId);
  };

  return (
    <Fieldset>
      <Stack
        direction="column"
        padding={isMobile ? "4px 10px" : "10px 16px"}
        gap="20px"
      >
        {validTabs.length > 0 && (
          <Stack direction="column">
            <Tabs
              tabs={validTabs}
              selectedTab={isSelected}
              onChange={handleManualTabChange}
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
        )}
      </Stack>
    </Fieldset>
  );
}

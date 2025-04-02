import { useFormik } from "formik";
import { useEffect, useContext, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Tabs } from "@inubekit/tabs";
import { Stack } from "@inubekit/inubekit";
import { Fieldset } from "@components/data/Fieldset";
import { postBusinessUnitRules } from "@services/businessUnitRules";
import { AppContext } from "@context/AppContext";
import { CustomerContext } from "@context/CustomerContext";
import { removeDuplicates } from "@utils/mappingData/mappings";
import { getSearchAllProspect } from "@services/prospects";

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [serverResponse, setServerResponse] = useState<any[]>([]);

  const userHasChangedTab = useRef(false);

  const { businessUnitSigla } = useContext(AppContext);

  const businessUnitPublicCode: string =
    JSON.parse(businessUnitSigla).businessUnitPublicCode;

  const { customerData } = useContext(CustomerContext);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [prospectData, setProspectData] = useState<Record<string, any>>({});

  const { prospectCode } = useParams();

  const fetchProspectData = useCallback(async () => {
    try {
      const prospect = await getSearchAllProspect(
        businessUnitPublicCode,
        prospectCode || ""
      );

      if (prospect && typeof prospect === "object") {
        if (JSON.stringify(prospect) !== JSON.stringify(prospectData)) {
          setProspectData(prospect);
        }
        return prospect;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      return null;
    }
  }, [businessUnitPublicCode, prospectCode, prospectData]);

  const fetchTabs = useCallback(async () => {
    try {
      if (
        !prospectData?.requested_amount ||
        !prospectData.credit_products?.length
      ) {
        return;
      }

      const rulesData = {
        ruleName: "ModeOfDisbursementType",
        conditions: [
          {
            condition: "LineOfCredit",
            value:
              prospectData.credit_products[0].line_of_credit_abbreviated_name,
          },
          {
            condition: "ClientType",
            value:
              customerData.generalAttributeClientNaturalPersons?.[0]?.associateType?.substring(
                0,
                1
              ) || "",
          },
          {
            condition: "LoanAmount",
            value: prospectData.requested_amount || 0,
          },
        ],
      };

      const response = await postBusinessUnitRules(
        businessUnitPublicCode,
        rulesData
      );

      if (!response || !Array.isArray(response) || response.length === 0) {
        return;
      }

      const uniqueResponse = removeDuplicates(response, "value");
      setServerResponse(uniqueResponse);

      const validDisbursements = uniqueResponse.map((item) => item.value);

      const availableTabs = Object.values(disbursemenTabs).filter((tab) =>
        validDisbursements.includes(tab.id)
      );

      if (availableTabs.length > 0 && !userHasChangedTab.current) {
        handleTabChange(availableTabs[0].id);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  }, [
    businessUnitPublicCode,
    prospectData,
    customerData,
    handleTabChange,
    userHasChangedTab,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      if (!prospectData?.requested_amount) {
        await fetchProspectData();
      }
      if (
        prospectData?.requested_amount &&
        prospectData?.credit_products?.length > 0
      ) {
        fetchTabs();
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prospectData]);

  const uniqueServerResponse = removeDuplicates(serverResponse, "value");

  const validTabs = Object.values(disbursemenTabs).filter((tab) =>
    uniqueServerResponse.some((response) => response.value === tab.id)
  );

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
        {uniqueServerResponse.length > 0 ? (
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
        ) : null}
      </Stack>
    </Fieldset>
  );
}

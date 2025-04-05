import { useContext, useState, useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "@inubekit/hooks";

import { CustomerContext } from "@context/CustomerContext";
import { AppContext } from "@context/AppContext";
import { getSearchAllProspect } from "@services/prospects";
import { postBusinessUnitRules } from "@services/businessUnitRules";

import { stepsFilingApplication } from "./config/filingApplication.config";
import { SubmitCreditApplicationUI } from "./interface";
import { FormData } from "./types";
import { evaluateRule } from "./evaluateRule";
import { ruleConfig } from "./config/configRules";
import { getMonthsElapsed } from "@utils/formatData/currency";

export function SubmitCreditApplication() {
  const { prospectCode } = useParams();
  const { customerData } = useContext(CustomerContext);
  const { businessUnitSigla } = useContext(AppContext);

  const dataHeader = { name: customerData?.fullName ?? "" };

  const businessUnitPublicCode: string =
    JSON.parse(businessUnitSigla).businessUnitPublicCode;

  const isMobile = useMediaQuery("(max-width:880px)");

  const [isCurrentFormValid, setIsCurrentFormValid] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [prospectData, setProspectData] = useState<Record<string, any>>({});

  const [valueRule, setValueRule] = useState<string[] | null>(null);

  const steps = useMemo(() => {
    if (!valueRule) return Object.values(stepsFilingApplication);
    const hideMortgage = !valueRule.includes("Hipoteca");
    const hidePledge = !valueRule.includes("Prenda");

    return Object.values(stepsFilingApplication).filter((step) => {
      if (step.id === 4 && hideMortgage) return false;
      if (step.id === 5 && hidePledge) return false;
      return true;
    });
  }, [valueRule]);

  const [currentStep, setCurrentStep] = useState<number>(steps[0]?.id || 1);

  useEffect(() => {
    if (steps.length > 0) {
      setCurrentStep(steps[0].id);
    }
  }, [steps]);

  const [formData, setFormData] = useState<FormData>({
    contactInformation: {
      document: "",
      documentNumber: "",
      name: "",
      lastName: "",
      email: "",
      phone: "",
    },
    borrowerData: {
      initialBorrowers: {
        id: "",
        name: "",
        debtorDetail: {
          document: "",
          documentNumber: "",
          name: "",
          lastName: "",
          email: "",
          number: "",
          sex: "",
          age: "",
          relation: "",
        },
      },
    },
    propertyOffered: {
      antique: "",
      estimated: "",
      type: "",
      state: "",
      description: "",
    },
    vehicleOffered: {
      state: "",
      model: "",
      value: "",
      description: "",
    },
    bail: {
      client: false,
    },
    disbursementGeneral: {
      Internal: {
        amount: "",
        account: "",
        description: "",
        name: "",
        lastName: "",
        sex: "",
        identification: "",
        birthdate: "",
        phone: "",
        mail: "",
        city: "",
        check: false,
        toggle: true,
        documentType: "",
      },
      External: {
        amount: "",
        check: false,
        toggle: true,
        description: "",
        name: "",
        lastName: "",
        sex: "",
        identification: "",
        birthdate: "",
        phone: "",
        mail: "",
        city: "",
        bank: "",
        accountType: "",
        accountNumber: "",
        documentType: "",
      },
      CheckEntity: {
        amount: "",
        check: false,
        toggle: true,
        description: "",
        name: "",
        lastName: "",
        sex: "",
        documentType: "",
        identification: "",
        birthdate: "",
        phone: "",
        mail: "",
        city: "",
      },
      CheckManagement: {
        amount: "",
        check: false,
        toggle: true,
        description: "",
        name: "",
        lastName: "",
        sex: "",
        documentType: "",
        identification: "",
        birthdate: "",
        phone: "",
        mail: "",
        city: "",
      },
      Cash: {
        amount: "",
        check: false,
        toggle: true,
        description: "",
        name: "",
        lastName: "",
        sex: "",
        documentType: "",
        identification: "",
        birthdate: "",
        phone: "",
        mail: "",
        city: "",
      },
    },
  });

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
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  }, [businessUnitPublicCode, prospectCode, prospectData]);

  useEffect(() => {
    fetchProspectData();
  }, [fetchProspectData]);

  useEffect(() => {
    const clientInfo = customerData?.generalAttributeClientNaturalPersons?.[0];
    const creditProduct = prospectData?.credit_products?.[0];

    if (!clientInfo || !creditProduct) return;

    const dataRules = {
      LineOfCredit: creditProduct.line_of_credit_abbreviated_name,
      ClientType: clientInfo.associateType?.substring(0, 1) || "",
      LoanAmount: prospectData.requested_amount,
      PrimaryIncomeType: "",
      AffiliateSeniority: getMonthsElapsed(
        customerData.generalAssociateAttributes?.[0]?.affiliateSeniorityDate,
        0
      ),
    };

    const rule = ruleConfig["ValidationGuarantee"]?.(dataRules);

    if (!rule) return;

    (async () => {
      const values = await evaluateRule(
        rule,
        (businessUnitPublicCode, data) =>
          postBusinessUnitRules(businessUnitPublicCode, data),
        "value",
        businessUnitPublicCode
      );

      const extractedValues = Array.isArray(values)
        ? values
            .map((v) => (typeof v === "string" ? v : v?.value))
            .filter((val): val is string => typeof val === "string")
        : [];

      setValueRule(extractedValues);
    })();
  }, [customerData, prospectData, businessUnitPublicCode]);

  const handleFormChange = (updatedValues: Partial<FormData>) => {
    setFormData((prev) => {
      if (
        JSON.stringify(prev) !== JSON.stringify({ ...prev, ...updatedValues })
      ) {
        return {
          ...prev,
          ...updatedValues,
        };
      }
      return prev;
    });
  };

  const handleNextStep = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    } else if (currentStep === steps.length) {
      handleSubmitClick();
    }
  };

  const handlePreviousStep = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
      setIsCurrentFormValid(true);
    }
  };

  const handleSubmitClick = () => {
    console.log("data: ", formData);
  };

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);
  const currentStepsNumber = {
    ...steps[currentStepIndex],
    number: currentStepIndex + 1,
  };

  return (
    <>
      <SubmitCreditApplicationUI
        steps={steps}
        currentStep={currentStep}
        isCurrentFormValid={isCurrentFormValid}
        setIsCurrentFormValid={setIsCurrentFormValid}
        formData={formData}
        dataHeader={dataHeader}
        handleFormChange={handleFormChange}
        handleNextStep={handleNextStep}
        handlePreviousStep={handlePreviousStep}
        setCurrentStep={setCurrentStep}
        currentStepsNumber={currentStepsNumber}
        handleSubmitClick={handleSubmitClick}
        isMobile={isMobile}
        data={prospectData}
        customerData={customerData}
      />
    </>
  );
}

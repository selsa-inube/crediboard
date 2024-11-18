import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormikProps } from "formik";
import { useMediaQuery } from "@inubekit/hooks";

import { Consulting } from "@components/modals/Consulting";
import { income } from "@src/mocks/add-prospect/income/income.mock";

import { IMessageState } from "./types/forms.types";
import { IGeneralInformationEntry } from "./components/GeneralInformationForm";
import { stepsAddProspect } from "./config/addProspect.config";
import { FormData, IFormAddPosition, IFormAddPositionRef } from "./types";
import { initalValuesPositions } from "./config/initialValues";
import { addPositionStepsRules } from "./utils";
import { AddProspectUI } from "./interface";

export function AddProspect() {
  const [currentStep, setCurrentStep] = useState<number>(
    stepsAddProspect.generalInformation.id
  );
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(true);
  const [message, setMessage] = useState<IMessageState>({
    visible: false,
  });
  const [showConsultingModal, setShowConsultingModal] = useState(false);

  const smallScreen = useMediaQuery("(max-width:880px)");
  const steps = Object.values(stepsAddProspect);
  const navigate = useNavigate();

  
  const [formData, setFormData] = useState<FormData>({
    selectedDestination: "",
    selectedProducts: [],
    loanConditionState: {
      toggles: {
        quotaCapToggle: true,
        maximumTermToggle: false,
      },
      quotaCapValue: "",
      maximumTermValue: "",
    },
    generalToggleChecked: true,
    togglesState: [false, true, false],
    incomeData: income[0],
    loanAmountState: {
      inputValue: "",
      toggleChecked: false,
      paymentPlan: "",
    },
    consolidatedCreditSelections: {
      totalCollected: 0,
      selectedValues: {},
    },
  });
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const handleFormDataChange = (field: string, newValue: string | number | boolean) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: newValue,
    }));
  };

  const handleConsolidatedCreditChange = (
    creditId: string,
    oldValue: number,
    newValue: number
  ) => {
    setFormData((prevState) => {
      const updatedSelections = {
        ...prevState.consolidatedCreditSelections.selectedValues,
        [creditId]: newValue,
      };

      const newTotalCollected =
        prevState.consolidatedCreditSelections.totalCollected -
        oldValue +
        newValue;

      return {
        ...prevState,
        consolidatedCreditSelections: {
          totalCollected: newTotalCollected,
          selectedValues: updatedSelections,
        },
      };
    });
  };

  const currentStepsNumber = steps.find(
    (step: { number: number }) => step.number === currentStep
  );

  const [dataAddPositionLinixForm, setDataAddPositionLinixForm] =
    useState<IFormAddPosition>({
      generalInformation: {
        isValid: false,
        values: initalValuesPositions.generalInformation,
      },
    });

  const generalInformationRef =
    useRef<FormikProps<IGeneralInformationEntry>>(null);

  const formReferences: IFormAddPositionRef = {
    generalInformation: generalInformationRef,
  };

  const handleStepChange = (stepId: number) => {
    const newAddPosition = addPositionStepsRules(
      currentStep,
      dataAddPositionLinixForm,
      formReferences,
      isCurrentFormValid
    );

    setDataAddPositionLinixForm(newAddPosition);

    const changeStepKey = Object.entries(stepsAddProspect).find(
      ([, config]) => config.id === currentStep
    )?.[0];

    if (!changeStepKey) return;

    const changeIsVerification = stepId === steps.length;

    setIsCurrentFormValid(
      changeIsVerification ||
        newAddPosition[changeStepKey as keyof IFormAddPosition]?.isValid ||
        true
    );

    setCurrentStep(stepId);

    document.getElementsByTagName("main")[0].scrollTo(0, 0);
  };

  const handleNextStep = () => {
    if (currentStep === steps.length) {
      handleSubmitClick();
    }
    if (currentStep === stepsAddProspect.loanConditions.id) {
      showConsultingForFiveSeconds();
    }
    if (currentStep + 1 <= steps.length && isCurrentFormValid) {
      handleStepChange(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    handleStepChange(currentStep - 1);
  };

  const handleCloseSectionMessage = () => {
    setMessage({
      visible: false,
    });
    navigate("/credit/positions");
  };

  function handleSubmitClick() {
    console.log("Enviar paso: ", currentStep);
  }

  const showConsultingForFiveSeconds = () => {
    setShowConsultingModal(true);
    setTimeout(() => {
      setShowConsultingModal(false);
    }, 2000);
  };

  return (
    <>
      <AddProspectUI
        steps={steps}
        currentStep={currentStep}
        isCurrentFormValid={isCurrentFormValid}
        dataAddPositionLinixForm={dataAddPositionLinixForm}
        formReferences={formReferences}
        message={message}
        setIsCurrentFormValid={setIsCurrentFormValid}
        handleNextStep={handleNextStep}
        handlePreviousStep={handlePreviousStep}
        setCurrentStep={setCurrentStep}
        handleCloseSectionMessage={handleCloseSectionMessage}
        currentStepsNumber={currentStepsNumber}
        handleSubmitClick={handleSubmitClick}
        formData={formData}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        handleFormDataChange={handleFormDataChange}
        handleConsolidatedCreditChange={handleConsolidatedCreditChange}
        smallScreen={smallScreen}
      />
      {showConsultingModal && <Consulting />}
    </>
  );
}

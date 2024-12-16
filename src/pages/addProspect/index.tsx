import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormikProps } from "formik";
import { useMediaQuery } from "@inubekit/hooks";

import { ListModal } from "@components/modals/ListModal";
import { Consulting } from "@components/modals/Consulting";
import { income } from "@mocks/add-prospect/income/income.mock";

import { IMessageState } from "./types/forms.types";
import { IGeneralInformationEntry } from "./components/GeneralInformationForm";
import { stepsAddProspect } from "./config/addProspect.config";
import { FormData, IFormAddPositionRef } from "./types";
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
  const [showDebtorModal, setShowDebtorModal] = useState(false);

  const isMobile = useMediaQuery("(max-width:880px)");
  const isTablet = useMediaQuery("(max-width: 1482px)");

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

  const handleFormDataChange = (
    field: string,
    newValue: string | number | boolean
  ) => {
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

  const generalInformationRef =
    useRef<FormikProps<IGeneralInformationEntry>>(null);

  const formReferences: IFormAddPositionRef = {
    generalInformation: generalInformationRef,
  };

  const handleNextStep = () => {
    const { togglesState } = formData;

    const dynamicSteps = [
      togglesState[0]
        ? stepsAddProspect.extraordinaryInstallments.id
        : undefined,
      togglesState[2] ? stepsAddProspect.extraBorrowers.id : undefined,
      togglesState[1] ? stepsAddProspect.sourcesIncome.id : undefined,
      stepsAddProspect.loanConditions.id,
    ].filter((step): step is number => step !== undefined);

    const currentStepIndex = dynamicSteps.indexOf(currentStep);

    if (currentStep === stepsAddProspect.loanConditions.id) {
      showConsultingForFiveSeconds();
    }
    if (currentStep === stepsAddProspect.extraBorrowers.id) {
      setShowDebtorModal(true);
      return;
    }
    if (currentStep === stepsAddProspect.sourcesIncome.id) {
      setCurrentStep(stepsAddProspect.obligationsFinancial.id);
      return;
    }  
    if (currentStep === stepsAddProspect.productSelection.id) {
      setCurrentStep(dynamicSteps[0]);
    } else if (
      currentStepIndex !== -1 &&
      currentStepIndex + 1 < dynamicSteps.length
    ) {
      setCurrentStep(dynamicSteps[currentStepIndex + 1]);
    } else if (currentStep + 1 <= steps.length && isCurrentFormValid) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === steps.length) {
      handleSubmitClick();
    }
  };

  const handlePreviousStep = () => {
    const { togglesState } = formData;

    const dynamicSteps = [
      togglesState[0]
        ? stepsAddProspect.extraordinaryInstallments.id
        : undefined,
      togglesState[2] ? stepsAddProspect.extraBorrowers.id : undefined,
      togglesState[1] ? stepsAddProspect.sourcesIncome.id : undefined,
      stepsAddProspect.loanConditions.id,
    ].filter((step): step is number => step !== undefined);

    const currentStepIndex = dynamicSteps.indexOf(currentStep);

    if (currentStep === stepsAddProspect.obligationsFinancial.id) {
      setCurrentStep(stepsAddProspect.sourcesIncome.id);
      return;
    }  
    if (currentStepIndex > 0) {
      setCurrentStep(dynamicSteps[currentStepIndex - 1]);
    } else if (currentStepIndex === 0) {
      setCurrentStep(stepsAddProspect.productSelection.id);
    } else if (currentStep - 1 >= steps[0].id) {
      setCurrentStep(currentStep - 1);
    }
    setIsCurrentFormValid(true);
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
        isMobile={isMobile}
        isTablet={isTablet}
      />
      {showConsultingModal && <Consulting />}
      {showDebtorModal && (
        <ListModal
          title="Deudor extra"
          handleClose={() => setShowDebtorModal(false)}
          handleSubmit={() => {
            setCurrentStep(stepsAddProspect.sourcesIncome.id);
            setShowDebtorModal(false);
          }}
          onSubmit={() => setShowDebtorModal(false)}
          buttonLabel="Si"
          content="Desea agrega otro deudor extra."
          cancelButton="No"
        />
      )}
    </>
  );
}

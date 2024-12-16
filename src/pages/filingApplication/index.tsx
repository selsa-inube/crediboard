import { useState } from "react";
import { useMediaQuery } from "@inubekit/hooks";

import { stepsAddProspect } from "./config/addProspect.config";
import { FilingApplicationUI } from "./interface";

export function FilingApplication() {
  const [currentStep, setCurrentStep] = useState<number>(
    stepsAddProspect.generalInformation.id
  );
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(true);

  const isMobile = useMediaQuery("(max-width:880px)");

  const steps = Object.values(stepsAddProspect);

  const currentStepsNumber = steps.find(
    (step: { number: number }) => step.number === currentStep
  ) || { id: 0, number: 0, name: "", description: "" };

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  function handleSubmitClick() {
    console.log("Enviar paso: ", currentStep);
  }

  return (
    <>
      <FilingApplicationUI
        steps={steps}
        currentStep={currentStep}
        isCurrentFormValid={isCurrentFormValid}
        setIsCurrentFormValid={setIsCurrentFormValid}
        handleNextStep={handleNextStep}
        handlePreviousStep={handlePreviousStep}
        setCurrentStep={setCurrentStep}
        currentStepsNumber={currentStepsNumber}
        handleSubmitClick={handleSubmitClick}
        isMobile={isMobile}
      />
    </>
  );
}

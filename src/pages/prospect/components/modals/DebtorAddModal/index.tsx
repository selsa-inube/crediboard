import { useState } from "react";
import { createPortal } from "react-dom";
import { useMediaQuery } from "@inubekit/hooks";
import { Blanket } from "@inubekit/blanket";

import { stepsAddBorrower } from "./config/addBorrower.config";
import { DebtorAddModalUI } from "./interface";
import { FormData } from "./types";

interface DebtorAddModalProps {
  onSubmit: () => void;
  handleClose: () => void;
  portalId?: string;
  title?: string;
}
export function DebtorAddModal(props: DebtorAddModalProps) {
  const { title = "", portalId, handleClose } = props;

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }
  const [currentStep, setCurrentStep] = useState<number>(
    stepsAddBorrower.generalInformation.id
  );
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      tipeOfDocument: "",
      documentNumber: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      sex: "",
      age: "",
      relation: "",
    },
  });

  const isMobile = useMediaQuery("(max-width:880px)");

  const steps = Object.values(stepsAddBorrower);

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
      setIsCurrentFormValid(true);
    }
  };

  function handleSubmitClick() {
    console.log("Enviar paso: ", currentStep);
  }

  const handleFormChange = (updatedValues: Partial<FormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...updatedValues,
    }));
  };

  return createPortal(
    <Blanket>
      <DebtorAddModalUI
        steps={steps}
        currentStep={currentStep}
        isCurrentFormValid={isCurrentFormValid}
        setIsCurrentFormValid={setIsCurrentFormValid}
        formData={formData}
        handleFormChange={handleFormChange}
        handleNextStep={handleNextStep}
        handlePreviousStep={handlePreviousStep}
        setCurrentStep={setCurrentStep}
        currentStepsNumber={currentStepsNumber}
        handleSubmitClick={handleSubmitClick}
        handleClose={handleClose}
        title={title}
        isMobile={isMobile}
      />
    </Blanket>,
    node
  );
}

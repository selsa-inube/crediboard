import { useEffect, useState } from "react";
import { useFlag, useMediaQuery } from "@inubekit/inubekit";

import { getIncomeSourcesById } from "@services/incomeSources";
import { IIncomeSources } from "@services/incomeSources/types";

import { stepsAddBorrower } from "./config/addBorrower.config";
import { DebtorAddModalUI } from "./interface";
import { FormData } from "./types";

interface DebtorAddModalProps {
  onSubmit: () => void;
  handleClose: () => void;
  title: string;
}
export function DebtorAddModal(props: DebtorAddModalProps) {
  const { title, handleClose } = props;

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
  const [incomeData, setIncomeData] = useState<IIncomeSources | undefined>(
    undefined
  );

  const { addFlag } = useFlag();

  const handleFlag = (error: unknown) => {
    addFlag({
      title: "Error Fuentes de ingreso",
      description: `Error al traer los datos: ${error}`,
      appearance: "danger",
      duration: 5000,
    });
  };

  const debtorId = formData.personalInfo.documentNumber.toString();

  useEffect(() => {
    if (!debtorId) return;

    const fetchIncomeData = async () => {
      try {
        const response = await getIncomeSourcesById(debtorId);
        setIncomeData(response);
      } catch (error) {
        handleFlag(error);
      }
    };

    fetchIncomeData();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debtorId]);

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

  return (
    <DebtorAddModalUI
      steps={steps}
      currentStep={currentStep}
      isCurrentFormValid={isCurrentFormValid}
      setIsCurrentFormValid={setIsCurrentFormValid}
      formData={formData}
      incomeData={incomeData}
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
  );
}

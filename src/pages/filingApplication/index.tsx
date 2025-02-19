import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "@inubekit/hooks";

import { userStepsMock } from "@mocks/filing-application/userSteps/users.mock";
import { choiceBorrowers } from "@mocks/filing-application/choice-borrowers/choiceborrowers.mock";

import { stepsFilingApplication } from "./config/filingApplication.config";
import { FilingApplicationUI } from "./interface";
import { FormData } from "./types";
import { dataFillingApplication } from "./config/config";

export function FilingApplication() {
  const { id } = useParams();
  const userId = parseInt(id || "0", 10);

  const userChoice =
    choiceBorrowers.find((choice) => choice.id === userId)?.choice ||
    "borrowers";
  const data =
    dataFillingApplication[
      userChoice === "borrowers" ? "borrowers" : "coBorrowers"
    ];

  const fixedSteps = [1, 2, 7, 8];

  const intermediateSteps =
    userStepsMock.find((user) => user.id === userId)?.intermediateSteps || [];

  const updatedSteps = {
    ...stepsFilingApplication,
    BorrowerData: {
      ...stepsFilingApplication.BorrowerData,
      name: data.stepName,
      description: data.stepDescription,
    },
  };

  const steps = Object.values(updatedSteps).filter((step) =>
    [...fixedSteps, ...intermediateSteps].includes(step.id)
  );

  const [currentStep, setCurrentStep] = useState<number>(steps[0]?.id || 1);
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    contactInformation: {
      email: "",
      phone: "",
    },
    borrowerData: {
      name: "",
      lastName: "",
      email: "",
      income: 0,
      obligations: 0,
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

  const isMobile = useMediaQuery("(max-width:880px)");

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);
  const currentStepsNumber = {
    ...steps[currentStepIndex],
    number: currentStepIndex + 1,
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

  function handleSubmitClick() {
    console.log("data: ", formData);
  }

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

  return (
    <>
      <FilingApplicationUI
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
        isMobile={isMobile}
      />
    </>
  );
}

import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "@inubekit/hooks";
import { useFlag } from "@inubekit/flag";

import { userStepsMock } from "@mocks/filing-application/userSteps/users.mock";
import { choiceBorrowers } from "@mocks/filing-application/choice-borrowers/choiceborrowers.mock";
import { CustomerContext } from "@context/CustomerContext";

import { stepsFilingApplication } from "./config/filingApplication.config";
import { SubmitCreditApplicationUI } from "./interface";
import { FormData } from "./types";
import { dataFillingApplication } from "./config/config";

export function SubmitCreditApplication() {
  const { prospectCode } = useParams();
  const { customerData } = useContext(CustomerContext);

  const userId = parseInt(prospectCode || "0", 10);

  const userChoice =
    choiceBorrowers.find((choice) => choice.id === userId)?.choice ||
    "borrowers";
  const data =
    dataFillingApplication[
      userChoice === "borrowers" ? "borrowers" : "coBorrowers"
    ];

  const fixedSteps = [1, 2, 7, 8];

  const dataHeader = { name: customerData.fullName };

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

  const [sentModal, setSentModal] = useState(false);
  const [approvedRequestModal, setApprovedRequestModal] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(steps[0]?.id || 1);
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(true);
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

  const isMobile = useMediaQuery("(max-width:880px)");

  const { addFlag } = useFlag();

  const handleFlag = () => {
    addFlag({
      title: "Error al enviar el radicado",
      description: "El radicado no se ha podido enviar correctamente.",
      appearance: "danger",
      duration: 5000,
    });
  };

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);
  const currentStepsNumber = {
    ...steps[currentStepIndex],
    number: currentStepIndex + 1,
  };

  const handleNextStep = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    } else if (currentStep === steps[steps.length - 1].id) {
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
    setSentModal(true);
  }

  function handleSendModal() {
    try {
      setSentModal(false);
      setApprovedRequestModal(true);
    } catch (error) {
      handleFlag();
    }
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
      <SubmitCreditApplicationUI
        steps={steps}
        currentStep={currentStep}
        isCurrentFormValid={isCurrentFormValid}
        setIsCurrentFormValid={setIsCurrentFormValid}
        formData={formData}
        dataHeader={dataHeader}
        sentModal={sentModal}
        approvedRequestModal={approvedRequestModal}
        numberProspectCode={prospectCode || ""}
        setApprovedRequestModal={setApprovedRequestModal}
        setSentModal={setSentModal}
        handleFormChange={handleFormChange}
        handleNextStep={handleNextStep}
        handlePreviousStep={handlePreviousStep}
        setCurrentStep={setCurrentStep}
        currentStepsNumber={currentStepsNumber}
        handleSubmitClick={handleSubmitClick}
        handleSendModal={handleSendModal}
        isMobile={isMobile}
      />
    </>
  );
}

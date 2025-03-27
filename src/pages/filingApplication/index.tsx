import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "@inubekit/inubekit";

import { AppContext } from "@context/AppContext";
import { postSubmitCredit } from "@services/submitCredit";
import { userStepsMock } from "@mocks/filing-application/userSteps/users.mock";
import { choiceBorrowers } from "@mocks/filing-application/choice-borrowers/choiceborrowers.mock";

import { stepsFilingApplication } from "./config/filingApplication.config";
import { FilingApplicationUI } from "./interface";
import { FormData } from "./types";
import { dataFillingApplication } from "./config/config";

export function FilingApplication() {
  const { id } = useParams();
  const userId = parseInt(id || "0", 10);

  const { businessUnitSigla, eventData } = useContext(AppContext);
  const { userAccount } =
    typeof eventData === "string" ? JSON.parse(eventData).user : eventData.user;

  const businessUnitPublicCode: string =
    JSON.parse(businessUnitSigla).businessUnitPublicCode;

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

  const {
    contactInformation,
    propertyOffered,
    vehicleOffered,
    disbursementGeneral,
  } = formData;

  const submitData = {
    clientEmail: contactInformation.email,
    clientIdentificationNumber: contactInformation.documentNumber,
    clientIdentificationType: contactInformation.document,
    clientName: `${contactInformation.name} ${contactInformation.lastName}`,
    clientId: "33333",
    clientPhoneNumber: contactInformation.phone.toString(),
    loanAmount: 155555,
    moneyDestinationAbreviatedName: "Vehiculo",
    moneyDestinationId: "13698",
    clientType: "333333",
    prospectId: id ? id : crypto.randomUUID().toString(),
    guarantees: [
      {
        guaranteeType: "mortgage",
        transactionOperation: "Insert",
        mortgages: [
          {
            descriptionUse: propertyOffered.description || "none",
            propertyAge: propertyOffered.antique || 1,
            propertyPrice: propertyOffered.estimated || 1,
            propertyType: propertyOffered.state || "none",
            transactionOperation: "Insert",
          },
        ],
      },
      {
        guaranteeType: "pledge",
        transactionOperation: "Insert",
        pledges: [
          {
            descriptionUse: vehicleOffered.description || "none",
            transactionOperation: "Insert",
            vehiculeAge: vehicleOffered.model || new Date().getFullYear(),
            vehiculePrice: vehicleOffered.value || 1,
          },
        ],
      },
    ],
    modesOfDisbursement: Object.entries(disbursementGeneral).map(
      ([key, value]) => ({
        accountBankCode: "100",
        accountBankName: value.accountType || "none",
        accountNumber: value.accountNumber || "none",
        accountType: value.account || "none",
        disbursementAmount: value.amount || 1,
        disbursementDate: "01/01/2025",
        isInTheNameOfBorrower: value.check ? "Y" : "N",
        modeOfDisbursementCode: "<string>",
        modeOfDisbursementType: key,
        observation: value.description || "none",
        payeeBiologicalSex: value.sex === "man" ? "M" : "F",
        payeeBirthday: value.birthdate || "01/01/2000",
        payeeCityOfResidence: value.city || "none",
        payeeEmail: value.mail || "none",
        payeeIdentificationNumber: value.identification || "none",
        payeeIdentificationType: value.documentType || "none",
        payeeName: value.name || "none",
        payeePersonType: "N",
        payeePhoneNumber: value.phone || "none",
        payeeSurname: value.lastName || "none",
        transactionOperation: "Insert",
      })
    ),
  };

  const handleSubmit = async () => {
    try {
      await postSubmitCredit(businessUnitPublicCode, userAccount, submitData);
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

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
    handleSubmit();
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

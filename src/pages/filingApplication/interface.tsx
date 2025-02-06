import { useState } from "react";
import { Assisted } from "@inubekit/assisted";
import { Stack } from "@inubekit/stack";
import { Button } from "@inubekit/button";

import { GeneralHeader } from "@pages/addProspect/components/GeneralHeader/";
import { FormData, IStep, StepDetails, titleButtonTextAssited } from "./types";
import { StyledContainerAssisted } from "./styles";
import { RequirementsNotMet } from "./steps/requirementsNotMet";
import { stepsFilingApplication } from "./config/filingApplication.config";
import { ContactInformation } from "./steps/contactInformation";
import { Borrowers } from "./steps/borrowerData";
import { PropertyOffered } from "./steps/propertyOffered";
import { VehicleOffered } from "./steps/vehicleOffered";
import { Bail } from "./steps/bail";
import { AttachedDocuments } from "./steps/attachedDocuments";
import { DisbursementGeneral } from "./steps/disbursementGeneral";
import { disbursemenTabs } from "@pages/filingApplication/steps/disbursementGeneral/config";

interface AddPositionUIProps {
  currentStep: number;
  currentStepsNumber: StepDetails;
  steps: IStep[];
  isCurrentFormValid: boolean;
  formData: FormData;
  isMobile: boolean;
  handleFormChange: (updatedValues: Partial<FormData>) => void;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  handleSubmitClick: () => void;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
}

export function FilingApplicationUI(props: AddPositionUIProps) {
  const {
    currentStepsNumber,
    currentStep,
    steps,
    isCurrentFormValid,
    formData,
    isMobile,
    handleFormChange,
    handleNextStep,
    handlePreviousStep,
    handleSubmitClick,
    setIsCurrentFormValid,
  } = props;

  const [isSelected, setIsSelected] = useState<string>();

  const handleTabChange = (tabId: string) => {
    setIsSelected(tabId);
  };

  return (
    <>
      <GeneralHeader
        buttonText="Agregar vinculación"
        descriptionStatus="Activo"
        name="José Manuel Hernández Díaz"
        profileImageUrl="https://s3-alpha-sig.figma.com/img/27d0/10fa/3d2630d7b4cf8d8135968f727bd6d965?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=h5lEzRE3Uk8fW5GT2LOd5m8eC6TYIJEH84ZLfY7WyFqMx-zv8TC1yzz-OV9FCH9veCgWZ5eBfKi4t0YrdpoWZriy4E1Ic2odZiUbH9uQrHkpxLjFwcMI2VJbWzTXKon-HkgvkcCnKFzMFv3BwmCqd34wNDkLlyDrFSjBbXdGj9NZWS0P3pf8PDWZe67ND1kropkpGAWmRp-qf9Sp4QTJW-7Wcyg1KPRy8G-joR0lsQD86zW6G6iJ7PuNHC8Pq3t7Jnod4tEipN~OkBI8cowG7V5pmY41GSjBolrBWp2ls4Bf-Vr1BKdzSqVvivSTQMYCi8YbRy7ejJo9-ZNVCbaxRg__"
      />
      <Stack
        direction="column"
        alignItems={isMobile ? "normal" : "center"}
        margin="20px 0px"
        padding="24px"
        height={isMobile ? "2000px" : "100%"}
      >
        <Stack
          gap="24px"
          direction="column"
          height="100%"
          width={isMobile ? "-webkit-fill-available" : "min(100%,1440px)"}
        >
          <StyledContainerAssisted $cursorDisabled={!isCurrentFormValid}>
            <Assisted
              step={currentStepsNumber!}
              totalSteps={steps.length}
              onBackClick={handlePreviousStep}
              onNextClick={handleNextStep}
              controls={titleButtonTextAssited}
              onSubmitClick={handleSubmitClick}
              disableNext={!isCurrentFormValid}
              disableSubmit={!isCurrentFormValid}
              size={isMobile ? "small" : "large"}
            />
          </StyledContainerAssisted>
          {currentStepsNumber &&
            currentStepsNumber.id ===
            stepsFilingApplication.generalInformation.id && (
              <RequirementsNotMet isMobile={isMobile} />
            )}
          {currentStepsNumber &&
            currentStepsNumber.id ===
            stepsFilingApplication.contactInformation.id && (
              <ContactInformation
                isMobile={isMobile}
                onFormValid={setIsCurrentFormValid}
                initialValues={formData.contactInformation}
                handleOnChange={(values) =>
                  handleFormChange({ contactInformation: values })
                }
              />
            )}
          {currentStepsNumber &&
            currentStepsNumber.id === stepsFilingApplication.BorrowerData.id && (
              <Borrowers
                isMobile={isMobile}
                onFormValid={setIsCurrentFormValid}
                initialValues={formData.borrowerData}
                handleOnChange={(values) =>
                  handleFormChange({ borrowerData: values })
                }
              />
            )}
          {currentStepsNumber &&
            currentStepsNumber.id ===
            stepsFilingApplication.propertyOffered.id && (
              <PropertyOffered
                isMobile={isMobile}
                onFormValid={setIsCurrentFormValid}
                initialValues={formData.propertyOffered}
                handleOnChange={(values) =>
                  handleFormChange({ propertyOffered: values })
                }
              />
            )}
          {currentStepsNumber &&
            currentStepsNumber.id ===
            stepsFilingApplication.vehicleOffered.id && (
              <VehicleOffered
                isMobile={isMobile}
                onFormValid={setIsCurrentFormValid}
                initialValues={formData.vehicleOffered}
                handleOnChange={(values) =>
                  handleFormChange({ vehicleOffered: values })
                }
              />
            )}
          {currentStepsNumber &&
            currentStepsNumber.id === stepsFilingApplication.bail.id && (
              <Bail
                onFormValid={setIsCurrentFormValid}
                initialValues={formData.bail}
                handleOnChange={(values) => handleFormChange({ bail: values })}
              />
            )}
          {currentStepsNumber &&
            currentStepsNumber.id ===
            stepsFilingApplication.attachedDocuments.id && (
              <AttachedDocuments isMobile={isMobile} />
            )}
          {currentStepsNumber &&
            currentStepsNumber.id === stepsFilingApplication.disbursement.id && (
              <DisbursementGeneral
                isMobile={isMobile}
                onFormValid={setIsCurrentFormValid}
                initialValues={formData.disbursementGeneral}
                handleOnChange={(values) =>
                  handleFormChange({ disbursementGeneral: values })
                }
                isSelected={isSelected || disbursemenTabs.internal.id}
                handleTabChange={handleTabChange}
              />
            )}
          <Stack justifyContent="end" gap="20px" margin="auto 0 0 0">
            <Button
              variant="outlined"
              appearance="gray"
              onClick={handlePreviousStep}
              disabled={currentStepsNumber === steps[0]}
            >
              {titleButtonTextAssited.goBackText}
            </Button>
            <Button onClick={handleNextStep} disabled={!isCurrentFormValid}>
              {currentStep === steps[steps.length - 1].id
                ? titleButtonTextAssited.submitText
                : titleButtonTextAssited.goNextText}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

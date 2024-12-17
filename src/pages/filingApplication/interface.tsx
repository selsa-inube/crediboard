import { Assisted } from "@inubekit/assisted";
import { Stack } from "@inubekit/stack";
import { Button } from "@inubekit/button";

import { FormData, IStep, StepDetails, titleButtonTextAssited } from "./types";
import { StyledContainerAssisted } from "./styles";
import { stepsFilingApplication } from "./config/filingApplication.config";
import { ContactInformation } from "./steps/contactInformation";

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

  return (
    <Stack
      direction="column"
      alignItems={isMobile ? "normal" : "center"}
      margin="20px 0px"
      padding="24px"
      height="100%"
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
            {currentStepsNumber === steps[8]
              ? titleButtonTextAssited.submitText
              : titleButtonTextAssited.goNextText}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
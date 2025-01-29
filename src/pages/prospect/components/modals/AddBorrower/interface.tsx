import { Assisted } from "@inubekit/assisted";
import { Stack } from "@inubekit/stack";
import { Button } from "@inubekit/button";

import { FormData, IStep, StepDetails, titleButtonTextAssited } from "./types";
import { StyledContainerAssisted } from "./styles";
import { stepsAddBorrower } from "./config/addBorrower.config";
import { AddBorrower } from "./steps/personalInfo";
import { Blanket } from "@inubekit/blanket";

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

export function AddBorrowerUI(props: AddPositionUIProps) {
  const {
    currentStepsNumber,
    steps,
    isCurrentFormValid,
    formData,
    isMobile,
    handleNextStep,
    handlePreviousStep,
    handleSubmitClick,
    setIsCurrentFormValid,
  } = props;

  return (
    <Blanket>
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
              stepsAddBorrower.contactInformation.id && (
              <AddBorrower
                title="Información personal"
                initialValues={formData.personalInfo}
                onFormValid={setIsCurrentFormValid}
                onSubmit={() => {}}
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
              {currentStepsNumber === steps[3]
                ? titleButtonTextAssited.submitText
                : titleButtonTextAssited.goNextText}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Blanket>
  );
}

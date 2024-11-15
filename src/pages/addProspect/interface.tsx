import { Assisted } from "@inubekit/assisted";
import { Stack } from "@inubekit/stack";
import { useMediaQuery } from "@inubekit/hooks";
import { Button } from "@inubekit/button";

import { extraordinaryInstallmentMock } from "@mocks/prospect/extraordinaryInstallment.mock";

import { ExtraordinaryInstallments } from "./steps/extraordinaryInstallments";

import { IMessageState } from "./types/forms.types";
import { stepsAddProspect } from "./config/addProspect.config";
import {
  IFormAddPosition,
  IFormAddPositionRef,
  IStep,
  titleButtonTextAssited,
  StepDetails,
} from "./types";
import { StyledContainerAssisted } from "./styles";
import { RequirementsNotMet } from "./steps/requirementsNotMet";
import { LoanAmount } from "./steps/loanAmount";
import { ConsolidatedCredit } from "./steps/consolidatedCredit";
import { ProductSelection } from "./steps/ProductSelection";
import { SourcesOfIncome } from "./steps/sourcesOfIncome";
import { MoneyDestination } from "./steps/MoneyDestination";
import { ObligationsFinancial } from "./steps/financialObligations";
import { LoanCondition } from "./steps/loanCondition";

interface AddPositionUIProps {
  currentStep: number;
  steps: IStep[];
  isCurrentFormValid: boolean;
  dataAddPositionLinixForm: IFormAddPosition;
  formReferences: IFormAddPositionRef;
  message: IMessageState;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  handleCloseSectionMessage: () => void;
  handleSubmitClick: () => void;
  currentStepsNumber?: StepDetails;
}

export function AddProspectUI(props: AddPositionUIProps) {
  const {
    currentStepsNumber,
    handleSubmitClick,
    steps,
    isCurrentFormValid,
    handleNextStep,
    handlePreviousStep,
  } = props;

  const smallScreen = useMediaQuery("(max-width:880px)");

  return (
    <Stack
      direction="column"
      alignItems={smallScreen ? "normal" : "center"}
      margin="20px 0px"
      padding="24px"
      height="100%"
    >
      <Stack
        gap="24px"
        direction="column"
        height="100%"
        width={smallScreen ? "-webkit-fill-available" : "min(100%,1440px)"}
      >
        <StyledContainerAssisted $cursorDisabled={!isCurrentFormValid}>
          <Assisted
            step={currentStepsNumber!}
            totalSteps={steps.length}
            onBackClick={handlePreviousStep}
            onNextClick={handleNextStep}
            controls={titleButtonTextAssited}
            onSubmitClick={handleSubmitClick}
            size={smallScreen ? "small" : "large"}
          />
        </StyledContainerAssisted>
        {currentStepsNumber &&
          currentStepsNumber.id === stepsAddProspect.generalInformation.id && (
            <RequirementsNotMet />
          )}
        {currentStepsNumber &&
          currentStepsNumber.id ===
            stepsAddProspect.extraordinaryInstallments.id && (
            <ExtraordinaryInstallments
              dataTable={extraordinaryInstallmentMock}
            />
          )}
        {currentStepsNumber &&
          currentStepsNumber.id === stepsAddProspect.destination.id && (
            <MoneyDestination />
          )}
        {currentStepsNumber &&
          currentStepsNumber.id === stepsAddProspect.productSelection.id && (
            <ProductSelection />
          )}
        {currentStepsNumber &&
          currentStepsNumber.id === stepsAddProspect.sourcesIncome.id && (
            <SourcesOfIncome />
          )}
        {currentStepsNumber &&
          currentStepsNumber.id ===
            stepsAddProspect.obligationsFinancial.id && (
            <ObligationsFinancial />
          )}
        {currentStepsNumber &&
          currentStepsNumber.id === stepsAddProspect.loanConditions.id && (
            <LoanCondition />
          )}
        {currentStepsNumber &&
          currentStepsNumber.id === stepsAddProspect.loanAmount.id && (
            <LoanAmount value={10000000} />
          )}
          {currentStepsNumber &&
          currentStepsNumber.id === stepsAddProspect.obligationsCollected.id && (
            <ConsolidatedCredit />
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
          <Button onClick={handleNextStep}>
            {currentStepsNumber === steps[9]
              ? titleButtonTextAssited.submitText
              : titleButtonTextAssited.goNextText}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

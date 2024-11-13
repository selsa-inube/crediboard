import { Assisted } from "@inubekit/assisted";
import { Stack } from "@inubekit/stack";
import { Button } from "@inubekit/button";

import { income } from "@mocks/income/income.mock";

import { IMessageState } from "./types/forms.types";
import { stepsAddProspect } from "./config/addProspect.config";
import {
  IFormAddPosition,
  IFormAddPositionRef,
  IStep,
  LoanConditionState,
  StepDetails,
  titleButtonTextAssited,
} from "./types";
import { StyledContainerAssisted } from "./styles";
import { RequirementsNotMet } from "./steps/requirementsNotMet";
import { ProductSelection } from "./steps/ProductSelection";
import { SourcesOfIncome } from "./steps/sourcesOfIncome";
import { MoneyDestination } from "./steps/MoneyDestination";
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
  selectedDestination: string;
  setSelectedDestination: React.Dispatch<React.SetStateAction<string>>;
  selectedProducts: string[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<string[]>>;
  loanConditionState: {
    toggles: {
      quotaCapToggle: boolean;
      maximumTermToggle: boolean;
    };
    quotaCapValue: string;
    maximumTermValue: string;
  };
  generalToggleChecked: boolean;
  togglesState: boolean[];
  incomeData: (typeof income)[0];
  handleIncome: (name: string, newValue: string) => void;
  handleToggleCheckedChange: () => void;
  handleToggleChange: (index: number) => void;
  handleLoanConditionChange: (newState: Partial<LoanConditionState>) => void;
  smallScreen: boolean;
}

export function AddProspectUI(props: AddPositionUIProps) {
  const {
    currentStepsNumber,
    handleSubmitClick,
    steps,
    isCurrentFormValid,
    handleNextStep,
    handlePreviousStep,
    selectedDestination,
    setSelectedDestination,
    selectedProducts,
    setSelectedProducts,
    generalToggleChecked,
    togglesState,
    incomeData,
    handleIncome,
    handleToggleCheckedChange,
    handleToggleChange,
    handleLoanConditionChange,
    loanConditionState,
    smallScreen,
  } = props;

  return (
    <Stack
      direction="column"
      alignItems={smallScreen ? "normal" : "center"}
      margin="20px 0px"
      padding="24px"
    >
      <Stack
        gap="48px"
        direction="column"
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
          currentStepsNumber.id === stepsAddProspect.destination.id && (
            <MoneyDestination
              selectedDestination={selectedDestination}
              setSelectedDestination={setSelectedDestination}
            />
          )}
        {currentStepsNumber &&
          currentStepsNumber.id === stepsAddProspect.productSelection.id && (
            <ProductSelection
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
              generalToggleChecked={generalToggleChecked}
              onGeneralToggleChange={handleToggleCheckedChange}
              togglesState={togglesState}
              onToggleChange={handleToggleChange}
            />
          )}
        {currentStepsNumber &&
          currentStepsNumber.id === stepsAddProspect.sourcesIncome.id && (
            <SourcesOfIncome
              incomeData={incomeData}
              onChange={handleIncome}
              options={incomeData.debtors}
            />
          )}
        {currentStepsNumber &&
          currentStepsNumber.id === stepsAddProspect.loanConditions.id && (
            <LoanCondition
              loanConditionState={loanConditionState}
              onChange={handleLoanConditionChange}
            />
          )}
        <Stack justifyContent="end" gap="20px">
          <Button
            variant="outlined"
            appearance="gray"
            onClick={handlePreviousStep}
            disabled={currentStepsNumber === steps[0]}
          >
            {titleButtonTextAssited.goBackText}
          </Button>
          <Button onClick={handleNextStep}>
            {currentStepsNumber === steps[7]
              ? titleButtonTextAssited.submitText
              : titleButtonTextAssited.goNextText}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

import { useState } from "react";
import { Assisted } from "@inubekit/assisted";
import { Stack } from "@inubekit/stack";
import { useMediaQuery } from "@inubekit/hooks";
import { Button } from "@inubekit/button";

import { income } from "@mocks/income/income.mock";

import { IMessageState } from "./types/forms.types";
import { stepsAddProspect } from "./config/addProspect.config";
import {
  IFormAddPosition,
  IFormAddPositionRef,
  IStep,
  titleButtonTextAssited,
} from "./types";
import { StyledContainerAssisted } from "./styles";
import { RequirementsNotMet } from "./steps/requirementsNotMet";
import { ProductSelection } from "./steps/ProductSelection";
import { SourcesOfIncome } from "./steps/sourcesOfIncome";
import { MoneyDestination } from "./steps/MoneyDestination";
import { LoanCondition } from "./steps/loanCondition";

interface StepDetails {
  id: number;
  number: number;
  name: string;
  description: string;
}
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

  const [selectedDestination, setSelectedDestination] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [loanConditionState, setLoanConditionState] = useState({
    toggles: {
      quotaCapToggle: true,
      maximumTermToggle: false,
    },
    quotaCapValue: "",
    maximumTermValue: "",
  });
  const [generalToggleChecked, setGeneralToggleChecked] = useState(true);
  const [togglesState, setTogglesState] = useState([false, true, false]);
  const [incomeData, setIncomeData] = useState(() => income[0]);

  const incomeDebtors = income[0].debtors;

  const handleIncome = (name: string, newValue: string) => {
    setIncomeData((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));
    console.log("a")
  };

  const handleToggleCheckedChange = () => {
    setGeneralToggleChecked(!generalToggleChecked);
  };

  const handleToggleChange = (index: number) => {
    const newToggles = [...togglesState];
    newToggles[index] = !newToggles[index];
    setTogglesState(newToggles);
  };

  const handleLoanConditionChange = (
    newState: Partial<typeof loanConditionState>
  ) => {
    setLoanConditionState((prevState) => ({ ...prevState, ...newState }));
  };

  const smallScreen = useMediaQuery("(max-width:880px)");

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
              options={incomeDebtors}
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

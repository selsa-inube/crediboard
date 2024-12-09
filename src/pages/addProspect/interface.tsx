import { Assisted } from "@inubekit/assisted";
import { Stack } from "@inubekit/stack";
import { Button } from "@inubekit/button";

import { extraordinaryInstallmentMock } from "@mocks/prospect/extraordinaryInstallment.mock";

import { ExtraordinaryInstallments } from "./steps/extraordinaryInstallments";
import { IMessageState } from "./types/forms.types";
import { stepsAddProspect } from "./config/addProspect.config";
import {
  FormData,
  IFormAddPositionRef,
  IStep,
  StepDetails,
  titleButtonTextAssited,
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
  formReferences: IFormAddPositionRef;
  message: IMessageState;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  handleCloseSectionMessage: () => void;
  handleSubmitClick: () => void;
  currentStepsNumber?: StepDetails;
  formData: FormData;
  selectedProducts: string[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<string[]>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleFormDataChange: (field: string, newValue: any) => void;
  handleConsolidatedCreditChange: (
    creditId: string,
    oldValue: number,
    newValue: number
  ) => void;
  isMobile: boolean;
  isTablet: boolean;
}

export function AddProspectUI(props: AddPositionUIProps) {
  const {
    currentStepsNumber,
    handleSubmitClick,
    steps,
    isCurrentFormValid,
    setIsCurrentFormValid,
    handleNextStep,
    handlePreviousStep,
    formData,
    handleFormDataChange,
    selectedProducts,
    setSelectedProducts,
    handleConsolidatedCreditChange,
    isMobile,
    isTablet,
  } = props;

  return (
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
          currentStepsNumber.id === stepsAddProspect.generalInformation.id && (
            <RequirementsNotMet isMobile={isMobile} />
          )}
        {currentStepsNumber &&
          currentStepsNumber.id === stepsAddProspect.destination.id && (
            <MoneyDestination
              initialValues={formData.selectedDestination}
              handleOnChange={(newDestination) =>
                handleFormDataChange("selectedDestination", newDestination)
              }
              onFormValid={setIsCurrentFormValid}
              isTablet={isTablet}
            />
          )}
        {currentStepsNumber &&
          currentStepsNumber.id === stepsAddProspect.productSelection.id && (
            <ProductSelection
              initialValues={{
                selectedProducts,
                generalToggleChecked: formData.generalToggleChecked,
                togglesState: formData.togglesState,
              }}
              handleOnChange={{
                setSelectedProducts,
                onGeneralToggleChange: () =>
                  handleFormDataChange(
                    "generalToggleChecked",
                    !formData.generalToggleChecked
                  ),
                onToggleChange: (index: number) => {
                  const newToggles = [...formData.togglesState];
                  newToggles[index] = !newToggles[index];
                  handleFormDataChange("togglesState", newToggles);
                },
              }}
              onFormValid={setIsCurrentFormValid}
              isMobile={isMobile}
            />
          )}
        {currentStepsNumber &&
          currentStepsNumber.id ===
            stepsAddProspect.extraordinaryInstallments.id && (
            <ExtraordinaryInstallments
              dataTable={extraordinaryInstallmentMock}
              isMobile={isMobile}
            />
          )}
        {currentStepsNumber &&
          currentStepsNumber.id === stepsAddProspect.extraBorrowers.id && (
            <Stack />
          )}
        {currentStepsNumber &&
          currentStepsNumber.id === stepsAddProspect.sourcesIncome.id && (
            <SourcesOfIncome
              initialValues={formData.incomeData}
              handleOnChange={(name: string, value: string) =>
                handleFormDataChange("incomeData", {
                  ...formData.incomeData,
                  [name]: value,
                })
              }
              options={formData.incomeData.borrowers}
              isMobile={isMobile}
            />
          )}
        {currentStepsNumber &&
          currentStepsNumber.id ===
            stepsAddProspect.obligationsFinancial.id && (
            <ObligationsFinancial isMobile={isMobile} />
          )}
        {currentStepsNumber &&
          currentStepsNumber.id === stepsAddProspect.loanConditions.id && (
            <LoanCondition
              initialValues={formData.loanConditionState}
              handleOnChange={(
                newState: Partial<typeof formData.loanConditionState>
              ) =>
                handleFormDataChange("loanConditionState", {
                  ...formData.loanConditionState,
                  ...newState,
                })
              }
              onFormValid={setIsCurrentFormValid}
              isMobile={isMobile}
            />
          )}
        {currentStepsNumber &&
          currentStepsNumber.id === stepsAddProspect.loanAmount.id && (
            <LoanAmount
              initialValues={formData.loanAmountState}
              handleOnChange={(
                newData: Partial<typeof formData.loanAmountState>
              ) =>
                handleFormDataChange("loanAmountState", {
                  ...formData.loanAmountState,
                  ...newData,
                })
              }
              onFormValid={setIsCurrentFormValid}
              isMobile={isMobile}
            />
          )}
        {currentStepsNumber &&
          currentStepsNumber.id ===
            stepsAddProspect.obligationsCollected.id && (
            <ConsolidatedCredit
              initialValues={formData.consolidatedCreditSelections}
              handleOnChange={handleConsolidatedCreditChange}
              isMobile={isMobile}
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
            {currentStepsNumber === steps[9]
              ? titleButtonTextAssited.submitText
              : titleButtonTextAssited.goNextText}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

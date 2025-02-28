import { Assisted } from "@inubekit/assisted";
import { Stack } from "@inubekit/stack";
import { Divider } from "@inubekit/divider";

import { BaseModal } from "@components/modals/baseModal";
import { income } from "@mocks/add-prospect/income/income.mock";
import { TableFinancialObligations } from "@pages/prospect/components/TableObligationsFinancial";

import { stepsAddBorrower } from "./config/addBorrower.config";
import { AddBorrower } from "./steps/personalInfo";
import { FormData, IStep, StepDetails, titleButtonTextAssited } from "./types";
import { SourceIncome } from "../../SourceIncome";

interface DebtorAddModalUIProps {
  currentStep: number;
  currentStepsNumber: StepDetails;
  steps: IStep[];
  isCurrentFormValid: boolean;
  formData: FormData;
  title: string;
  isMobile: boolean;
  handleFormChange: (updatedValues: Partial<FormData>) => void;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  handleSubmitClick: () => void;
  handleClose: () => void;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DebtorAddModalUI(props: DebtorAddModalUIProps) {
  const {
    currentStepsNumber,
    steps,
    isCurrentFormValid,
    formData,
    title,
    isMobile,
    handleFormChange,
    handleNextStep,
    handlePreviousStep,
    handleSubmitClick,
    handleClose,
    setIsCurrentFormValid,
  } = props;

  return (
    <BaseModal
      title={title}
      nextButton={
        currentStepsNumber === steps[2]
          ? titleButtonTextAssited.submitText
          : titleButtonTextAssited.goNextText
      }
      backButton={titleButtonTextAssited.goBackText}
      handleNext={handleNextStep}
      handleBack={handlePreviousStep}
      handleClose={handleClose}
      disabledNext={!isCurrentFormValid}
      disabledBack={currentStepsNumber === steps[0]}
      finalDivider={true}
      width={isMobile ? "290px" : "950px"}
      height="100%"
    >
      <Stack direction="column" gap="16px">
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
        <Divider />
        {currentStepsNumber &&
          currentStepsNumber.id === stepsAddBorrower.generalInformation.id && (
            <AddBorrower
              title="Información personal"
              initialValues={formData.personalInfo}
              onFormValid={setIsCurrentFormValid}
              handleOnChange={(values) =>
                handleFormChange({ personalInfo: values })
              }
            />
          )}
        {currentStepsNumber &&
          currentStepsNumber.id === stepsAddBorrower.contactInformation.id && (
            <SourceIncome
              form={income[0]}
              options={income[0].borrowers}
              onChange={(name: string, newValue: string) => {
                handleFormChange({ [name]: newValue });
              }}
              onlyDebtor={true}
            />
          )}
        {currentStepsNumber &&
          currentStepsNumber.id === stepsAddBorrower.BorrowerData.id && (
            <TableFinancialObligations showActions={true} />
          )}
      </Stack>
    </BaseModal>
  );
}

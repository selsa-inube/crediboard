import { MdClear } from "react-icons/md";
import { Assisted } from "@inubekit/assisted";
import { Stack } from "@inubekit/stack";
import { Button } from "@inubekit/button";
import { Blanket } from "@inubekit/blanket";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { Divider } from "@inubekit/divider";

import { income } from "@mocks/add-prospect/income/income.mock";
import { TableFinancialObligations } from "@pages/prospect/components/TableObligationsFinancial";

import { stepsAddBorrower } from "./config/addBorrower.config";
import { AddBorrower } from "./steps/personalInfo";
import { StyledContainer, StyledContainerClose } from "./styles";
import { FormData, IStep, StepDetails, titleButtonTextAssited } from "./types";
import { dataAddBorrower } from "./config/config";
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
    <Blanket>
      <StyledContainer>
        <Stack
          direction="column"
          alignItems={isMobile ? "normal" : "center"}
          padding="12px 24px"
          width={isMobile ? "290px" : "960px"}
          height={isMobile ? "100%" : "740px"}
        >
          <Stack
            gap="16px"
            direction="column"
            height="100%"
            width={isMobile ? "-webkit-fill-available" : "min(100%,1440px)"}
          >
            <Stack justifyContent="space-between" alignItems="center">
              <Text type="headline" size="small">
                {title}
              </Text>
              <StyledContainerClose onClick={handleClose}>
                <Stack alignItems="center" gap="8px">
                  <Text type="body" size="large">
                    {dataAddBorrower.close}
                  </Text>
                  <Icon
                    icon={<MdClear />}
                    size="24px"
                    cursorHover
                    appearance="dark"
                  />
                </Stack>
              </StyledContainerClose>
            </Stack>
            <Divider />
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
              currentStepsNumber.id ===
                stepsAddBorrower.generalInformation.id && (
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
              currentStepsNumber.id ===
                stepsAddBorrower.contactInformation.id && (
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
            <Stack direction="column" gap="20px" margin="auto 0 0 0">
              <Divider />
              <Stack justifyContent="end" gap="20px">
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
        </Stack>
      </StyledContainer>
    </Blanket>
  );
}

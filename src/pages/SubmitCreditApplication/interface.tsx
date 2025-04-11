import { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Button } from "@inubekit/button";
import { Assisted, Breadcrumbs, Icon, Text, Stack } from "@inubekit/inubekit";
import { MdCheckCircle, MdOutlineShare } from "react-icons/md";

import { BaseModal } from "@components/modals/baseModal";
import { disbursemenTabs } from "@pages/SubmitCreditApplication/steps/disbursementGeneral/config";
import { GeneralHeader } from "@pages/addProspect/components/GeneralHeader/";
import { ICustomerData } from "@context/CustomerContext/types";

import { FormData, IStep, StepDetails, titleButtonTextAssited } from "./types";
import { StyledArrowBack, StyledContainerAssisted } from "./styles";
import { RequirementsNotMet } from "./steps/requirementsNotMet";
import { stepsFilingApplication } from "./config/filingApplication.config";
import { ContactInformation } from "./steps/contactInformation";
import { Borrowers } from "./steps/borrowerData";
import { PropertyOffered } from "./steps/propertyOffered";
import { VehicleOffered } from "./steps/vehicleOffered";
import { Bail } from "./steps/bail";
import { AttachedDocuments } from "./steps/attachedDocuments";
import { DisbursementGeneral } from "./steps/disbursementGeneral";
import { submitCreditApplicationConfig } from "./config/submitCreditApplication.config";
import { dataSubmitApplication } from "./config/config";

interface SubmitCreditApplicationUIProps {
  currentStep: number;
  currentStepsNumber: StepDetails;
  steps: IStep[];
  isCurrentFormValid: boolean;
  formData: FormData;
  isMobile: boolean;
  prospectCode: string;
  sentModal: boolean;
  approvedRequestModal: boolean;
  numberProspectCode: string;
  dataHeader: { name: string; status: string };
  setSentModal: React.Dispatch<React.SetStateAction<boolean>>;
  setApprovedRequestModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleFormChange: (updatedValues: Partial<FormData>) => void;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  handleSubmitClick: () => void;
  handleSendModal: () => void;
  setIsCurrentFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  customerData?: ICustomerData;
}

export function SubmitCreditApplicationUI(
  props: SubmitCreditApplicationUIProps
) {
  const {
    currentStepsNumber,
    currentStep,
    steps,
    isCurrentFormValid,
    formData,
    isMobile,
    dataHeader,
    prospectCode,
    numberProspectCode,
    sentModal,
    approvedRequestModal,
    setSentModal,
    setApprovedRequestModal,
    handleFormChange,
    handleNextStep,
    handlePreviousStep,
    handleSubmitClick,
    handleSendModal,
    setIsCurrentFormValid,
    data,
    customerData,
  } = props;

  const [isSelected, setIsSelected] = useState<string>();

  const handleTabChange = (tabId: string) => {
    setIsSelected(tabId);
  };

  const navigate = useNavigate();

  const handleHome = () => {
    navigate(
      submitCreditApplicationConfig.route.replace(":prospectCode", prospectCode)
    );
  };

  return (
    <>
      <GeneralHeader
        buttonText="Agregar vinculación"
        descriptionStatus={dataHeader.status}
        name={dataHeader.name}
        profileImageUrl="https://s3-alpha-sig.figma.com/img/27d0/10fa/3d2630d7b4cf8d8135968f727bd6d965?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=h5lEzRE3Uk8fW5GT2LOd5m8eC6TYIJEH84ZLfY7WyFqMx-zv8TC1yzz-OV9FCH9veCgWZ5eBfKi4t0YrdpoWZriy4E1Ic2odZiUbH9uQrHkpxLjFwcMI2VJbWzTXKon-HkgvkcCnKFzMFv3BwmCqd34wNDkLlyDrFSjBbXdGj9NZWS0P3pf8PDWZe67ND1kropkpGAWmRp-qf9Sp4QTJW-7Wcyg1KPRy8G-joR0lsQD86zW6G6iJ7PuNHC8Pq3t7Jnod4tEipN~OkBI8cowG7V5pmY41GSjBolrBWp2ls4Bf-Vr1BKdzSqVvivSTQMYCi8YbRy7ejJo9-ZNVCbaxRg__"
      />
      <Stack
        direction="column"
        alignItems={isMobile ? "normal" : "center"}
        margin="20px 0px"
        padding="24px"
        height="100vh"
      >
        <Stack
          gap="24px"
          direction="column"
          height="100%"
          width={isMobile ? "-webkit-fill-available" : "min(100%,1440px)"}
        >
          <Breadcrumbs crumbs={submitCreditApplicationConfig.crumbs} />
          <StyledArrowBack onClick={handleHome}>
            <Stack gap="8px" alignItems="center">
              <Icon icon={<MdArrowBack />} appearance="dark" size="20px" />
              <Text type="title" size="large">
                {submitCreditApplicationConfig.title}
              </Text>
            </Stack>
          </StyledArrowBack>
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
              showCurrentStepNumber={false}
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
              stepsFilingApplication.contactInformation.id &&
            customerData && (
              <ContactInformation
                isMobile={isMobile}
                onFormValid={setIsCurrentFormValid}
                initialValues={formData.contactInformation}
                handleOnChange={(values) =>
                  handleFormChange({ contactInformation: values })
                }
                customerData={customerData}
              />
            )}
          {currentStepsNumber &&
            currentStepsNumber.id ===
              stepsFilingApplication.BorrowerData.id && (
              <Borrowers
                isMobile={isMobile}
                onFormValid={setIsCurrentFormValid}
                initialValues={formData.borrowerData}
                handleOnChange={(values) =>
                  handleFormChange({ borrowerData: values })
                }
                data={data}
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
                data={data}
              />
            )}
          {currentStepsNumber &&
            currentStepsNumber.id ===
              stepsFilingApplication.attachedDocuments.id && (
              <AttachedDocuments isMobile={isMobile} />
            )}
          {currentStepsNumber &&
            currentStepsNumber.id ===
              stepsFilingApplication.disbursement.id && (
              <DisbursementGeneral
                isMobile={isMobile}
                onFormValid={setIsCurrentFormValid}
                initialValues={formData.disbursementGeneral}
                handleOnChange={(values) =>
                  handleFormChange({ disbursementGeneral: values })
                }
                isSelected={isSelected || disbursemenTabs.internal.id}
                handleTabChange={handleTabChange}
                data={data}
                identificationNumber={customerData?.publicCode || ""}
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
        {sentModal && (
          <BaseModal
            title={dataSubmitApplication.modals.file}
            nextButton={dataSubmitApplication.modals.continue}
            backButton={dataSubmitApplication.modals.cancel}
            handleNext={handleSendModal}
            handleBack={() => setSentModal(false)}
            width={isMobile ? "290px" : "402px"}
          >
            <Text type="body" size="large">
              {dataSubmitApplication.modals.fileDescription.replace(
                "{numberProspectCode}",
                numberProspectCode
              )}
            </Text>
          </BaseModal>
        )}
        {approvedRequestModal && (
          <BaseModal
            title={dataSubmitApplication.modals.filed}
            nextButton={dataSubmitApplication.modals.cancel}
            backButton={dataSubmitApplication.modals.share}
            iconBeforeback={
              <Icon icon={<MdOutlineShare />} appearance="gray" size="16px" />
            }
            handleNext={() => setApprovedRequestModal(false)}
            handleClose={() => setApprovedRequestModal(false)}
            handleBack={() => console.log("data: ", formData)}
            width={isMobile ? "290px" : "402px"}
          >
            <Stack direction="column" alignItems="center" gap="24px">
              <Icon icon={<MdCheckCircle />} appearance="success" size="68px" />
              <Stack gap="6px">
                <Text type="body" size="large">
                  {dataSubmitApplication.modals.filed}
                </Text>
                <Text type="body" size="large" weight="bold">
                  {numberProspectCode}
                </Text>
              </Stack>
              <Text type="body" size="medium" appearance="gray">
                {dataSubmitApplication.modals.filedDescription}
              </Text>
            </Stack>
          </BaseModal>
        )}
      </Stack>
    </>
  );
}

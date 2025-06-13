import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineAdd,
  MdOutlineChevronRight,
  MdOutlineMoreVert,
  MdOutlinePhone,
  MdOutlinePictureAsPdf,
  MdOutlineShare,
  MdOutlineVideocam,
  MdOutlinePayments,
  MdOutlineInfo,
} from "react-icons/md";
import {
  Stack,
  Icon,
  Text,
  Divider,
  useMediaQuery,
  Button,
  useFlag,
} from "@inubekit/inubekit";

import { ICreditRequest, IModeOfDisbursement } from "@services/types";
import { textFlagsUsers } from "@config/pages/staffModal/addFlag";
import { MenuProspect } from "@components/navigation/MenuProspect";
import {
  truncateTextToMaxLength,
  capitalizeFirstLetter,
  capitalizeFirstLetterEachWord,
} from "@utils/formatData/text";
import { ExtraordinaryPaymentModal } from "@components/modals/ExtraordinaryPaymentModal";
import { DisbursementModal } from "@components/modals/DisbursementModal";
import { Fieldset } from "@components/data/Fieldset";
import { extraordinaryInstallmentMock } from "@mocks/prospect/extraordinaryInstallment.mock";
import { formatPrimaryDate } from "@utils/formatData/date";
import { currencyFormat } from "@utils/formatData/currency";
import { CreditProspect } from "@components/layout/CreditProspect";
import { IProspect, ICreditProduct } from "@services/prospects/types";
import { getCreditRequestByCode } from "@services/credit-request/query/getCreditRequestByCode";
import { getModeOfDisbursement } from "@services/credit-request/query/getModeOfDisbursement";
import { AppContext } from "@context/AppContext";
import { dataTabsDisbursement } from "@components/modals/DisbursementModal/types";
import { ItemNotFound } from "@components/layout/ItemNotFound";
import { BaseModal } from "@components/modals/baseModal";
import userNotFound from "@assets/images/ItemNotFound.png";

import { titlesModal } from "../ToDo/config";
import { errorMessages } from "../config";
import { menuOptions, tittleOptions } from "./config/config";
import {
  StyledCollapseIcon,
  StyledFieldset,
  StyledContainerIcon,
  StyledVerticalDivider,
  StyledPrint,
} from "./styles";

interface ComercialManagementProps {
  data: ICreditRequest;
  prospectData: IProspect;
  collapse: boolean;
  setCollapse: React.Dispatch<React.SetStateAction<boolean>>;
  print: () => void;
  id: string;
  isPrint?: boolean;
  hideContactIcons?: boolean;
  hasPermitRejection?: boolean;
}

export const ComercialManagement = (props: ComercialManagementProps) => {
  const {
    data,
    print,
    isPrint = false,
    collapse,
    setCollapse,
    id,
    hideContactIcons,
    prospectData,
    hasPermitRejection,
  } = props;
  const [showMenu, setShowMenu] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [modalHistory, setModalHistory] = useState<string[]>([]);
  const [prospectProducts, setProspectProducts] = useState<ICreditProduct[]>(
    []
  );

  const [internal, setInternal] = useState<IModeOfDisbursement | null>(null);
  const [external, setExternal] = useState<IModeOfDisbursement | null>(null);
  const [checkEntity, setCheckEntity] = useState<IModeOfDisbursement | null>(
    null
  );
  const [checkManagement, setCheckManagement] =
    useState<IModeOfDisbursement | null>(null);
  const [cash, setCash] = useState<IModeOfDisbursement | null>(null);

  const [requests, setRequests] = useState<ICreditRequest | null>(null);

  const navigation = useNavigate();
  const { addFlag } = useFlag();
  const isMobile = useMediaQuery("(max-width: 720px)");

  const { businessUnitSigla } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  const businessUnitPublicCode: string =
    JSON.parse(businessUnitSigla).businessUnitPublicCode;

  const handleOpenModal = (modalName: string) => {
    setModalHistory((prevHistory) => [...prevHistory, modalName]);
  };

  useEffect(() => {
    if (prospectData && Array.isArray(prospectData.creditProducts)) {
      setProspectProducts(prospectData.creditProducts as ICreditProduct[]);
    }
  }, [prospectData]);

  useEffect(() => {
    const fetchCreditRequest = async () => {
      try {
        const data = await getCreditRequestByCode(businessUnitPublicCode, id);
        setRequests(data[0] as ICreditRequest);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchCreditRequest();
    }
  }, [businessUnitPublicCode, id]);

  const handleDisbursement = async () => {
    if (requests?.creditRequestId) {
      setLoading(true);
      try {
        const disbursement = await getModeOfDisbursement(
          businessUnitPublicCode,
          requests.creditRequestId
        );

        const internalData =
          disbursement.find(
            (item) => item.modeOfDisbursementType === "Internal_account"
          ) || null;
        const externalData =
          disbursement.find(
            (item) => item.modeOfDisbursementType === "External_account"
          ) || null;
        const checkEntityData =
          disbursement.find(
            (item) => item.modeOfDisbursementType === "Certified_check"
          ) || null;
        const checkManagementData =
          disbursement.find(
            (item) => item.modeOfDisbursementType === "Business_check"
          ) || null;
        const cashData =
          disbursement.find((item) => item.modeOfDisbursementType === "Cash") ||
          null;
        setInternal(internalData);
        setExternal(externalData);
        setCheckEntity(checkEntityData);
        setCheckManagement(checkManagementData);
        setCash(cashData);
      } catch (error) {
        console.error(error);
        addFlag({
          title: textFlagsUsers.titleWarning,
          description: textFlagsUsers.descriptionWarning,
          appearance: "danger",
          duration: 5000,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseModal = () => {
    setModalHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      newHistory.pop();
      return newHistory;
    });
  };

  const handleCollapse = () => {
    setCollapse(!collapse);
    setShowMenu(false);
  };

  const currentModal = modalHistory[modalHistory.length - 1];

  const dataDefault: dataTabsDisbursement = {
    disbursementAmount: "",
    isInTheNameOfBorrower: "",
    payeeName: "",
    payeeSurname: "",
    payeeBiologicalSex: "",
    payeeIdentificationType: "",
    payeeIdentificationNumber: "",
    payeeBirthday: "",
    payeePhoneNumber: "",
    payeeEmail: "",
    payeeCityOfResidence: "",
    accountBankName: "",
    accountType: "",
    accountNumber: "",
    observation: "",
  };

  return (
    <>
      <Fieldset
        title={errorMessages.comercialManagement.titleCard}
        descriptionTitle={errorMessages.comercialManagement.descriptionCard}
        hasError={!data ? true : false}
      >
        {!data ? (
          <ItemNotFound
            image={userNotFound}
            title={errorMessages.comercialManagement.title}
            description={errorMessages.comercialManagement.description}
            buttonDescription={errorMessages.comercialManagement.button}
            onRetry={() => navigation(-2)}
          />
        ) : (
          <StyledFieldset>
            <Stack direction="column" gap="6px">
              <Stack justifyContent="space-between" alignItems="center">
                <Stack direction="column">
                  <Stack>
                    <Stack gap="6px" width="max-content">
                      <Text type="title" size="small" appearance="gray">
                        {tittleOptions.titleCreditId}
                      </Text>
                      <Text type="title" size="small">
                        {data.creditRequestCode}
                      </Text>
                      <Text
                        type="title"
                        size="small"
                        appearance="gray"
                        padding={`0px 0px 0px 8px`}
                      >
                        {formatPrimaryDate(
                          new Date(data.creditRequestDateOfCreation)
                        )}
                      </Text>
                    </Stack>
                  </Stack>
                  {isMobile && (
                    <Stack margin="4px 0px">
                      <Text type="title" size={!isMobile ? "large" : "medium"}>
                        {data.clientName &&
                          capitalizeFirstLetterEachWord(
                            truncateTextToMaxLength(data.clientName)
                          )}
                      </Text>
                    </Stack>
                  )}
                  <Stack gap={!isMobile ? "4px" : "4px"}>
                    <Text type="title" size="small" appearance="gray">
                      {tittleOptions.titleDestination}
                    </Text>
                    <Text type="title" size="small">
                      {data.clientName &&
                        capitalizeFirstLetter(
                          truncateTextToMaxLength(data.moneyDestinationId, 60)
                        )}
                    </Text>
                  </Stack>
                  <Stack gap="4px">
                    <Text type="title" size="small" appearance="gray">
                      {tittleOptions.tittleAmount}
                    </Text>
                    <Text type="title" size="small">
                      {data.loanAmount === 0
                        ? "$ 0"
                        : currencyFormat(data.loanAmount)}
                    </Text>
                  </Stack>
                </Stack>

                {!isMobile && (
                  <Stack gap="36px">
                    <Text type="title">
                      {data.clientName &&
                        capitalizeFirstLetterEachWord(
                          truncateTextToMaxLength(data.clientName)
                        )}
                    </Text>
                  </Stack>
                )}
                <Stack gap="2px">
                  {!isMobile && (
                    <>
                      <StyledPrint>
                        <Stack gap="16px">
                          <Button
                            type="link"
                            spacing="compact"
                            path={`/extended-card/${id}/credit-profile`}
                          >
                            {tittleOptions.titleProfile}
                          </Button>
                          <Stack gap="2px" alignItems="center">
                            <Button
                              type="button"
                              spacing="compact"
                              variant="outlined"
                              disabled={hasPermitRejection ? false : true}
                              onClick={() => {
                                handleDisbursement();
                                handleOpenModal("disbursementModal");
                              }}
                            >
                              {tittleOptions.titleDisbursement}
                            </Button>
                            {!hasPermitRejection && (
                              <Icon
                                icon={<MdOutlineInfo />}
                                appearance="primary"
                                size="16px"
                                cursorHover
                                onClick={() => setInfoModal(true)}
                              />
                            )}
                          </Stack>
                        </Stack>
                      </StyledPrint>
                      {!hideContactIcons && (
                        <>
                          <StyledVerticalDivider />
                          <StyledPrint>
                            <Icon
                              icon={<MdOutlinePhone />}
                              appearance="primary"
                              size="24px"
                              cursorHover
                            />
                          </StyledPrint>
                          <StyledPrint>
                            <Icon
                              icon={<MdOutlineVideocam />}
                              appearance="primary"
                              size="24px"
                              cursorHover
                            />
                          </StyledPrint>
                        </>
                      )}
                      <StyledVerticalDivider />
                    </>
                  )}
                  <StyledCollapseIcon
                    $collapse={collapse}
                    onClick={handleCollapse}
                  >
                    <StyledPrint>
                      <Icon
                        icon={<MdOutlineChevronRight />}
                        appearance="primary"
                        size={"26px"}
                        cursorHover
                      />
                    </StyledPrint>
                  </StyledCollapseIcon>
                </Stack>
              </Stack>
              {isMobile && (
                <>
                  <StyledPrint>
                    <Button
                      type="link"
                      spacing="compact"
                      path={`/extended-card/${id}/credit-profile`}
                      fullwidth
                    >
                      {tittleOptions.titleProfile}
                    </Button>
                  </StyledPrint>
                  <StyledPrint>
                    <Button
                      type="button"
                      spacing="compact"
                      variant="outlined"
                      onClick={() => {
                        handleDisbursement();
                        handleOpenModal("disbursementModal");
                      }}
                      fullwidth
                    >
                      {tittleOptions.titleDisbursement}
                    </Button>
                  </StyledPrint>
                </>
              )}
              {isMobile && !hideContactIcons && (
                <Stack gap="16px" padding="12px 0px 12px 0px">
                  <Button
                    spacing="compact"
                    variant="outlined"
                    fullwidth
                    iconBefore={<MdOutlinePhone />}
                  >
                    {tittleOptions.titleCall}
                  </Button>
                  <Button
                    spacing="compact"
                    variant="outlined"
                    fullwidth
                    iconBefore={<MdOutlineVideocam />}
                  >
                    {tittleOptions.titleVideoCall}
                  </Button>
                </Stack>
              )}

              {collapse && <Divider />}
              {collapse && (
                <>
                  {isMobile && (
                    <Stack padding="10px 0px" width="100%">
                      <Button
                        type="button"
                        appearance="primary"
                        spacing="compact"
                        fullwidth
                        iconBefore={
                          <Icon
                            icon={<MdOutlineAdd />}
                            appearance="light"
                            size="18px"
                            spacing="narrow"
                          />
                        }
                      >
                        {tittleOptions.titleAddProduct}
                      </Button>
                    </Stack>
                  )}
                </>
              )}
              {collapse && (
                <>
                  {isMobile && (
                    <Stack padding="0px 0px 10px">
                      {prospectProducts?.some(
                        (product) => product.extraordinaryInstallments
                      ) && (
                        <Button
                          type="button"
                          appearance="primary"
                          spacing="compact"
                          variant="outlined"
                          fullwidth
                          iconBefore={
                            <Icon
                              icon={<MdOutlinePayments />}
                              appearance="primary"
                              size="18px"
                              spacing="narrow"
                            />
                          }
                          onClick={() => handleOpenModal("extraPayments")}
                        >
                          {tittleOptions.titleExtraPayments}
                        </Button>
                      )}
                    </Stack>
                  )}
                </>
              )}
              {collapse && (
                <>
                  {isMobile && (
                    <Stack justifyContent="end">
                      <StyledContainerIcon>
                        <Icon
                          icon={<MdOutlinePictureAsPdf />}
                          appearance="primary"
                          size="24px"
                          disabled={isPrint}
                          cursorHover
                          onClick={print}
                        />
                        <Icon
                          icon={<MdOutlineShare />}
                          appearance="primary"
                          size="24px"
                          cursorHover
                        />
                        <Icon
                          icon={<MdOutlineMoreVert />}
                          appearance="primary"
                          size="24px"
                          cursorHover
                          onClick={() => setShowMenu(!showMenu)}
                        />
                        {showMenu && (
                          <MenuProspect
                            options={menuOptions(
                              handleOpenModal,
                              !prospectProducts?.some(
                                (product) => product.extraordinaryInstallments
                              )
                            )}
                          />
                        )}
                      </StyledContainerIcon>
                    </Stack>
                  )}
                </>
              )}
              {collapse && <Stack>{isMobile && <Divider />}</Stack>}
              {collapse && (
                <CreditProspect
                  isMobile={isMobile}
                  isPrint={isPrint}
                  showMenu={() => setShowMenu(false)}
                  showPrint
                  prospectData={prospectData}
                />
              )}
            </Stack>
            {currentModal === "extraPayments" && (
              <ExtraordinaryPaymentModal
                dataTable={extraordinaryInstallmentMock}
                handleClose={handleCloseModal}
              />
            )}
            {currentModal === "disbursementModal" && (
              <DisbursementModal
                isMobile={isMobile}
                handleClose={handleCloseModal}
                loading={loading}
                data={{
                  internal: internal || dataDefault,
                  external: external || dataDefault,
                  CheckEntity: checkEntity || dataDefault,
                  checkManagementData: checkManagement || dataDefault,
                  cash: cash || dataDefault,
                }}
                handleDisbursement={handleDisbursement}
              />
            )}
            {infoModal && (
              <>
                <BaseModal
                  title={titlesModal.title}
                  nextButton={titlesModal.textButtonNext}
                  handleNext={() => setInfoModal(false)}
                  handleClose={() => setInfoModal(false)}
                  width={isMobile ? "290px" : "400px"}
                >
                  <Stack gap="16px" direction="column">
                    <Text weight="bold" size="large">
                      {titlesModal.subTitle}
                    </Text>
                    <Text weight="normal" size="medium" appearance="gray">
                      {titlesModal.description}
                    </Text>
                  </Stack>
                </BaseModal>
              </>
            )}
          </StyledFieldset>
        )}
      </Fieldset>
    </>
  );
};

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MdOutlineAdd,
  MdOutlineChevronRight,
  MdOutlineMoreVert,
  MdOutlinePhone,
  MdOutlinePictureAsPdf,
  MdOutlineShare,
  MdOutlineVideocam,
  MdOutlinePayments,
} from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { useMediaQuery } from "@inubekit/hooks";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Divider } from "@inubekit/divider";

import { MenuProspect } from "@components/navigation/MenuProspect";
import {
  truncateTextToMaxLength,
  capitalizeFirstLetter,
  capitalizeFirstLetterEachWord,
} from "@utils/formatData/text";
import { ExtraordinaryPaymentModal } from "@components/modals/ExtraordinaryPaymentModal";
import { CreditProspect } from "@pages/prospect/components/CreditProspect";
import { Fieldset } from "@components/data/Fieldset";
import { extraordinaryInstallmentMock } from "@mocks/prospect/extraordinaryInstallment.mock";
import { getById } from "@mocks/utils/dataMock.service";
import { formatPrimaryDate } from "@utils/formatData/date";
import { currencyFormat } from "@utils/formatData/currency";
import { ICreditProductProspect, ICreditRequest } from "@services/types";
import { DisbursementModal } from "@components/modals/DisbursementModal";

import { menuOptions, tittleOptions } from "./config/config";
import {
  StyledCollapseIcon,
  StyledFieldset,
  StyledContainerIcon,
  StyledVerticalDivider,
} from "./styles";

interface ComercialManagementProps {
  data: ICreditRequest;
  print: () => void;
  isPrint?: boolean;
}

export const ComercialManagement = (props: ComercialManagementProps) => {
  const { data, print, isPrint = false } = props;
  const [collapse, setCollapse] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [modalHistory, setModalHistory] = useState<string[]>([]);
  const [prospectProducts, setProspectProducts] =
    useState<ICreditProductProspect>();

  const { prospectCode } = useParams();

  const isMobile = useMediaQuery("(max-width: 720px)");

  const handleOpenModal = (modalName: string) => {
    setModalHistory((prevHistory) => [...prevHistory, modalName]);
  };
  useEffect(() => {
    try {
      Promise.allSettled([
        getById("prospects", "public_code", prospectCode!, true),
      ]).then(([prospects]) => {
        if (
          prospects.status === "fulfilled" &&
          Array.isArray(prospects.value)
        ) {
          if (!(prospects.value instanceof Error)) {
            setProspectProducts(
              prospects.value
                .map((dataPropects) => dataPropects.credit_product)
                .flat()[0] as ICreditProductProspect
            );
          }
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  }, [prospectCode]);

  const handleCloseModal = () => {
    setModalHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      newHistory.pop();
      return newHistory;
    });
  };

  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  const currentModal = modalHistory[modalHistory.length - 1];

  return (
    <Fieldset title="Estado" descriptionTitle="Gestión Comercial">
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
                  <Stack gap="16px">
                    <Button
                      type="link"
                      spacing="compact"
                      path={`/extended-card/${prospectCode}/credit-profile`}
                    >
                      {tittleOptions.titleProfile}
                    </Button>
                    <Button
                      type="button"
                      spacing="compact"
                      variant="outlined"
                      onClick={() => handleOpenModal("disbursementModal")}
                    >
                      {tittleOptions.titleDisbursement}
                    </Button>
                  </Stack>
                  <StyledVerticalDivider />
                  <Icon
                    icon={<MdOutlinePhone />}
                    appearance="primary"
                    size="24px"
                    cursorHover
                  />
                  <Icon
                    icon={<MdOutlineVideocam />}
                    appearance="primary"
                    size="24px"
                    cursorHover
                  />
                  <StyledVerticalDivider />
                </>
              )}
              <StyledCollapseIcon $collapse={collapse} onClick={handleCollapse}>
                <Icon
                  icon={<MdOutlineChevronRight />}
                  appearance="primary"
                  size={isMobile ? "32px" : "24px"}
                  cursorHover
                />
              </StyledCollapseIcon>
            </Stack>
          </Stack>
          {isMobile && (
            <>
              <Button
                type="link"
                spacing="compact"
                path={`/extended-card/${prospectCode}/credit-profile`}
                fullwidth
              >
                {tittleOptions.titleProfile}
              </Button>
              <Button
                type="button"
                spacing="compact"
                variant="outlined"
                onClick={() => handleOpenModal("disbursementModal")}
                fullwidth
              >
                {tittleOptions.titleDisbursement}
              </Button>
            </>
          )}
          {isMobile && (
            <Stack gap="16px" padding="12px 0px 12px 0px">
              {isMobile && (
                <Button
                  spacing="compact"
                  variant="outlined"
                  fullwidth
                  iconBefore={<MdOutlinePhone />}
                >
                  {tittleOptions.titleCall}
                </Button>
              )}
              {isMobile && (
                <Button
                  spacing="compact"
                  variant="outlined"
                  fullwidth
                  iconBefore={<MdOutlineVideocam />}
                >
                  {tittleOptions.titleVideoCall}
                </Button>
              )}
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
                  {prospectProducts?.ordinary_installment_for_principal && (
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
                          !prospectProducts?.ordinary_installment_for_principal
                        )}
                        onMouseLeave={() => setShowMenu(false)}
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
            />
          )}
        </Stack>
        {currentModal === "extraPayments" && (
          <ExtraordinaryPaymentModal
            dataTable={extraordinaryInstallmentMock}
            portalId="portal"
            handleClose={handleCloseModal}
          />
        )}
        {currentModal === "disbursementModal" && (
          <DisbursementModal
            isMobile={isMobile}
            portalId="portal"
            handleClose={handleCloseModal}
          />
        )}
      </StyledFieldset>
    </Fieldset>
  );
};

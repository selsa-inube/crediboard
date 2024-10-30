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

import { getById } from "@mocks/utils/dataMock.service";
import { CreditLimit } from "@components/modals/CreditLimit";
import { Fieldset } from "@components/data/Fieldset";
import { IncomeModal } from "@components/modals/IncomeModal";
import { PaymentCapacity } from "@components/modals/PaymentCapacityModal";
import { ReciprocityModal } from "@components/modals/ReciprocityModal";
import { ReportCreditsModal } from "@components/modals/ReportCreditsModal";
import { ScoreModal } from "@components/modals/FrcModal";
import {
  truncateTextToMaxLength,
  capitalizeFirstLetter,
  capitalizeFirstLetterEachWord,
} from "@utils/formatData/text";
import { formatPrimaryDate } from "@utils/formatData/date";
import { currencyFormat } from "@utils/formatData/currency";
import { ICreditProductProspect, Requests } from "@services/types";
import { MenuPropect } from "@components/navigation/MenuPropect";
import { extraordinaryInstallmentMock } from "@mocks/prospect/extraordinaryInstallment.mock";
import { ExtraordinaryPaymentModal } from "@pages/prospect/components/ExtraordinaryPaymentModal";
import { mockProspectCredit } from "@mocks/prospect/prospectCredit.mock";

import { menuOptions ,incomeOptions} from "./config/config";
import {
  StyledCollapseIcon,
  StyledFieldset,
  StyledContainerIcon,
  StyledVerticalDivider,
} from "./styles";

interface ComercialManagementProps {
  data: Requests;
  children?: JSX.Element;
  print: () => void;
  isPrint?: boolean;
}

export const ComercialManagement = (props: ComercialManagementProps) => {
  const { data, children, print, isPrint } = props;
  const [collapse, setCollapse] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [modalHistory, setModalHistory] = useState<string[]>([]);
  const [prospectProducts, setProspectProducts] =
    useState<ICreditProductProspect>();
  const maxReciprocity = 40000000;

  const { id } = useParams();
  const [form, setForm] = useState({
    debtor: "",
    monthly_salary: 0,
    other_monthly_payments: 0,
    pension_allowances: 0,
    leases: 0,
    dividends_or_shares: 0,
    financial_returns: 0,
    average_monthly_profit: 0,
    monthly_fees: 0,
    total: undefined,
  });

  useEffect(() => {
    if (id) {
      const foundProspect = mockProspectCredit.find(
        (prospect) => prospect.public_code === id
      );
      if (foundProspect) {
        const mockCredit = foundProspect.consolidated_credit[0];
        setForm({
          debtor: foundProspect.borrower[0].borrower_name,
          monthly_salary: mockCredit.monthly_salary ?? 0,
          other_monthly_payments: mockCredit.other_monthly_payments ?? 0,
          pension_allowances: mockCredit.pension_allowances ?? 0,
          leases: mockCredit.leases ?? 0,
          dividends_or_shares: mockCredit.dividends_or_shares ?? 0,
          financial_returns: mockCredit.financial_returns ?? 0,
          average_monthly_profit: mockCredit.average_monthly_profit ?? 0,
          monthly_fees: mockCredit.monthly_fees ?? 0,
          total: undefined,
        });
      }
    }
  }, [id]);

  const onChanges = (name: string, newValue: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: newValue,
    }));
  };

  const isMobile = useMediaQuery("(max-width: 720px)");

  const handleOpenModal = (modalName: string) => {
    setModalHistory((prevHistory) => [...prevHistory, modalName]);
  };
  useEffect(() => {
    try {
      Promise.allSettled([getById("prospects", "public_code", id!, true)]).then(
        ([prospects]) => {
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
        }
      );
    } catch (error) {
      console.log("error", error);
    }
  }, [id]);

  const handleCloseModal = () => {
    setModalHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      newHistory.pop();
      return newHistory;
    });
  };

  const handleGoBackOrCloseModal = () => {
    setOpenModal(null);
  };

  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  const currentModal = modalHistory[modalHistory.length - 1];

  return (
    <Fieldset title="Estado" descriptionTitle="Gestión Comercial">
      <StyledFieldset>
        <Stack direction="column" gap="12px">
          <Stack justifyContent="space-between" alignItems="center">
            <Stack direction="column">
              <Stack>
                <Stack gap="6px" width="max-content">
                  <Text type="title" size="small" appearance="gray">
                    No. Rad.:
                  </Text>
                  <Text type="title" size="small">
                    {data.k_Prospe}
                  </Text>
                  <Text
                    type="title"
                    size="small"
                    appearance="gray"
                    padding={`0px 0px 0px 8px`}
                  >
                    {formatPrimaryDate(new Date(data.f_Prospe))}
                  </Text>
                </Stack>
              </Stack>
              {isMobile && (
                <Stack margin="4px 0px">
                  <Text type="title" size={!isMobile ? "large" : "medium"}>
                    {data.nnasocia &&
                      capitalizeFirstLetterEachWord(
                        truncateTextToMaxLength(data.nnasocia)
                      )}
                  </Text>
                </Stack>
              )}
              <Stack gap={!isMobile ? "4px" : "4px"}>
                <Text type="title" size="small" appearance="gray">
                  Destino:
                </Text>
                <Text type="title" size="small">
                  {data.nnasocia &&
                    capitalizeFirstLetter(
                      truncateTextToMaxLength(data.k_Desdin, 60)
                    )}
                </Text>
              </Stack>
              <Stack gap="4px">
                <Text type="title" size="small" appearance="gray">
                  Valor:
                </Text>
                <Text type="title" size="small">
                  {data.v_Monto === 0 ? "$ 0" : currencyFormat(data.v_Monto)}
                </Text>
              </Stack>
            </Stack>

            {!isMobile && (
              <Stack gap="36px">
                <Text type="title">
                  {data.nnasocia &&
                    capitalizeFirstLetterEachWord(
                      truncateTextToMaxLength(data.nnasocia)
                    )}
                </Text>
              </Stack>
            )}
            <Stack gap="2px">
              {!isMobile && (
                <>
                  <Button
                    type="link"
                    spacing="compact"
                    path={`/extended-card/${id}/credit-profile`}
                  >
                    Ver perfil crediticio
                  </Button>
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
            <Button
              type="link"
              spacing="compact"
              path={`/extended-card/${id}/credit-profile`}
              fullwidth
            >
              Ver perfil crediticio
            </Button>
          )}
          {collapse && <Divider />}
          {collapse && (
            <Stack direction="column" gap="24px">
              {!isMobile && (
                <Stack gap="16px" justifyContent="end" alignItems="center">
                  <Button
                    type="button"
                    appearance="primary"
                    spacing="compact"
                    iconBefore={
                      <Icon
                        icon={<MdOutlineAdd />}
                        appearance="light"
                        size="18px"
                        spacing="narrow"
                      />
                    }
                  >
                    Agregar producto
                  </Button>
                  {prospectProducts?.ordinary_installment_for_principal && (
                    <Button
                      type="button"
                      appearance="primary"
                      spacing="compact"
                      variant="outlined"
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
                      Pagos extras
                    </Button>
                  )}

                  <StyledVerticalDivider />
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
                      <MenuPropect
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
              <Stack direction="column">{children}</Stack>
            </Stack>
          )}
        </Stack>

        {currentModal === "creditLimit" && (
          <CreditLimit
            handleClose={handleCloseModal}
            title="Origen de cupo"
            portalId="portal"
            maxPaymentCapacity={50000000}
            maxReciprocity={40000000}
            maxDebtFRC={45000000}
            assignedLimit={0}
            currentPortfolio={10000000}
            maxUsableLimit={20000000}
            availableLimitWithoutGuarantee={15000000}
            onOpenPaymentCapacityModal={() => setOpenModal("paymentCapacity")}
            onOpenReciprocityModal={() => setOpenModal("reciprocityModal")}
            onOpenFrcModal={() => setOpenModal("scoreModal")}
          />
        )}
        {openModal === "paymentCapacity" && (
          <PaymentCapacity
            title="Cupo máx. capacidad de pago"
            portalId="portal"
            handleClose={handleGoBackOrCloseModal}
            reportedIncomeSources={2000000}
            reportedFinancialObligations={6789000}
            subsistenceReserve={2000000}
            availableForNewCommitments={5000000}
            maxVacationTerm={12}
            maxAmount={1000000}
          />
        )}
        {openModal === "reciprocityModal" && (
          <ReciprocityModal
            portalId="portal"
            handleClose={handleGoBackOrCloseModal}
            balanceOfContributions={maxReciprocity}
            accordingToRegulation={1234500}
            assignedQuota={1000000}
          />
        )}
        {openModal === "scoreModal" && (
          <ScoreModal
            title="Score Details"
            handleClose={handleGoBackOrCloseModal}
            subTitle="Your Financial Score"
            totalScore={750}
            seniority={150}
            centralRisk={50}
            employmentStability={230}
            maritalStatus={30}
            economicActivity={118}
            monthlyIncome={3000000}
            maxIndebtedness="50000000"
          />
        )}
        {currentModal === "IncomeModal" && (
          <IncomeModal
            onChange={onChanges}
            form={form}
            handleClose={handleCloseModal}
            options={incomeOptions}
          />
        )}
        {currentModal === "reportCreditsModal" && (
          <ReportCreditsModal
            handleClose={handleCloseModal}
            portalId="portal"
            totalBalance={87000000}
            totalFee={3300000}
            options={incomeOptions}
            onChange={onChanges}
            debtor={form.debtor}
          />
        )}
        {currentModal === "extraPayments" && (
          <ExtraordinaryPaymentModal
            dataTable={extraordinaryInstallmentMock}
            portalId="portal"
            handleClose={handleCloseModal}
          />
        )}
      </StyledFieldset>
    </Fieldset>
  );
};

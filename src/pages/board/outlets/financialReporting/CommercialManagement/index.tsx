import { cloneElement, useEffect, useState } from "react";
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
import { FormikValues } from "formik";

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
import { EditProductModal } from "@components/modals/ProspectProductModal";
import {
  truncateTextToMaxLength,
  capitalizeFirstLetter,
  capitalizeFirstLetterEachWord,
} from "@utils/formatData/text";
import { formatPrimaryDate } from "@utils/formatData/date";
import { currencyFormat } from "@utils/formatData/currency";
import { ICreditProductProspect, ICreditRequest } from "@services/types";
import { MenuProspect } from "@components/navigation/MenuProspect";
import { extraordinaryInstallmentMock } from "@mocks/prospect/extraordinaryInstallment.mock";
import { addCreditProduct } from "@mocks/utils/addCreditProductMock.service";
import { ExtraordinaryPaymentModal } from "@components/modals/ExtraordinaryPaymentModal";
import { mockProspectCredit } from "@mocks/prospect/prospectCredit.mock";
import { DisbursementModal } from "@components/modals/DisbursementModal";

import { menuOptions, incomeOptions, tittleOptions } from "./config/config";
import {
  StyledCollapseIcon,
  StyledFieldset,
  StyledContainerIcon,
  StyledVerticalDivider,
} from "./styles";

interface ComercialManagementProps {
  data: ICreditRequest;
  children?: JSX.Element;
  print: () => void;
  isPrint?: boolean;
}

export const ComercialManagement = (props: ComercialManagementProps) => {
  const { data, children = <Stack />, print, isPrint } = props;
  const [collapse, setCollapse] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [updatedChildren, setUpdatedChildren] = useState(children);
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [modalHistory, setModalHistory] = useState<string[]>([]);
  const [prospectProducts, setProspectProducts] =
    useState<ICreditProductProspect>();
  const maxReciprocity = 40000000;

  const { id } = useParams();
  const [form, setForm] = useState({
    borrower: "",
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

  const initialValues: FormikValues = {
    creditLine: "",
    creditAmount: "",
    paymentMethod: "",
    paymentCycle: "",
    firstPaymentCycle: "",
    termInMonths: "",
    amortizationType: "",
    interestRate: "",
    rateType: "",
  };

  useEffect(() => {
    if (id) {
      const foundProspect = mockProspectCredit.find(
        (prospect) => prospect.public_code === id
      );
      if (foundProspect) {
        const mockCredit = foundProspect.consolidated_credit[0];
        setForm({
          borrower: foundProspect.borrower[0].borrower_name,
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
    setUpdatedChildren(cloneElement(children));
  };

  const handleGoBackOrCloseModal = () => {
    setOpenModal(null);
  };

  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  const handleConfirm = async (values: FormikValues) => {
    if (!id) {
      console.error("ID no está definido");
      return;
    }

    const result = await addCreditProduct(id, values, mockProspectCredit);

    if (result) {
      handleCloseModal();
    }
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
                      path={`/extended-card/${id}/credit-profile`}
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
                path={`/extended-card/${id}/credit-profile`}
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
                    onClick={() => handleOpenModal("editProductModal")}
                  >
                    {tittleOptions.titleAddProduct}
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
                      {tittleOptions.titleExtraPayments}
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
                    <StyledVerticalDivider />
                    <MenuProspect
                      only
                      options={menuOptions(
                        handleOpenModal,
                        !prospectProducts?.ordinary_installment_for_principal
                      )}
                      onMouseLeave={() => setShowMenu(false)}
                    />
                  </StyledContainerIcon>
                </Stack>
              )}
              <Stack direction="column">{updatedChildren}</Stack>
            </Stack>
          )}
        </Stack>

        {currentModal === "creditLimit" && (
          <CreditLimit
            handleClose={handleCloseModal}
            title="Origen de cupo"
            portalId="portal"
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
            accordingToRegulation={2}
            assignedQuota={1000000}
          />
        )}
        {openModal === "scoreModal" && (
          <ScoreModal
            title="Score Details"
            handleClose={handleGoBackOrCloseModal}
            subTitle="Your Financial Score"
            totalScore={150}
            seniority={150}
            centralRisk={50}
            employmentStability={230}
            maritalStatus={30}
            economicActivity={118}
            monthlyIncome={3000000}
            maxIndebtedness={50000000}
          />
        )}
        {currentModal === "editProductModal" && (
          <EditProductModal
            portalId="portal"
            title="Agregar producto"
            confirmButtonText="Guardar"
            initialValues={initialValues}
            iconBefore={<MdOutlineAdd />}
            onCloseModal={handleCloseModal}
            onConfirm={handleConfirm}
          />
        )}
        {currentModal === "editProductModal" && (
          <EditProductModal
            portalId="portal"
            title="Agregar producto"
            confirmButtonText="Guardar"
            initialValues={initialValues}
            iconBefore={<MdOutlineAdd />}
            onCloseModal={handleCloseModal}
            onConfirm={handleConfirm}
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
            debtor={form.borrower}
          />
        )}
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

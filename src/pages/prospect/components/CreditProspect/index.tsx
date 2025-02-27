import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FormikValues } from "formik";
import {
  MdOutlineAdd,
  MdOutlinePayments,
  MdOutlinePictureAsPdf,
  MdOutlineShare,
} from "react-icons/md";
import { Button } from "@inubekit/button";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";

import { MenuProspect } from "@components/navigation/MenuProspect";
import { PaymentCapacity } from "@components/modals/PaymentCapacityModal";
import { ReciprocityModal } from "@components/modals/ReciprocityModal";
import { ScoreModal } from "@components/modals/FrcModal";
import { EditProductModal } from "@components/modals/ProspectProductModal";
import { IncomeModal } from "@components/modals/IncomeModal";
import { ReportCreditsModal } from "@components/modals/ReportCreditsModal";
import { ExtraordinaryPaymentModal } from "@components/modals/ExtraordinaryPaymentModal";
import { CreditLimit } from "@components/modals/CreditLimit";

import { ICreditProductProspect } from "@services/types";
import { extraordinaryInstallmentMock } from "@mocks/prospect/extraordinaryInstallment.mock";
import { addCreditProduct } from "@mocks/utils/addCreditProductMock.service";
import { mockProspectCredit } from "@mocks/prospect/prospectCredit.mock";
import {
  incomeOptions,
  menuOptions,
} from "@pages/board/outlets/financialReporting/CommercialManagement/config/config";
import {
  StyledContainerIcon,
  StyledVerticalDivider,
} from "@pages/board/outlets/financialReporting/CommercialManagement/styles";
import { CardCommercialManagement } from "@pages/board/outlets/financialReporting/CommercialManagement/CardCommercialManagement";

import { dataCreditProspect } from "./config";

interface ICreditProspectProps {
  showMenu: () => void;
  isMobile: boolean;
  isPrint?: boolean | undefined;
  showPrint?: boolean;
}

export function CreditProspect(props: ICreditProspectProps) {
  const { showMenu, isMobile, isPrint, showPrint } = props;

  const [modalHistory, setModalHistory] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState<string | null>(null);
  const handleOpenModal = (modalName: string) => {
    setModalHistory((prevHistory) => [...prevHistory, modalName]);
  };
  const currentModal = modalHistory[modalHistory.length - 1];

  const handleCloseModal = () => {
    setModalHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      newHistory.pop();
      return newHistory;
    });
  };

  const { id } = useParams();

  const [prospectProducts, setProspectProducts] =
    useState<ICreditProductProspect>();
  const dataCommercialManagementRef = useRef<HTMLDivElement>(null);

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

  const onChanges = (name: string, newValue: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: newValue,
    }));
  };

  const handleConfirm = async (values: FormikValues) => {
    if (!id) {
      console.error("ID no está definido");
      setProspectProducts;
      return;
    }

    const result = await addCreditProduct(id, values, mockProspectCredit);

    if (result) {
      handleCloseModal();
    }
  };

  return (
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
            {dataCreditProspect.addProduct}
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
              {dataCreditProspect.extraPayment}
            </Button>
          )}
          <StyledVerticalDivider />
          <StyledContainerIcon>
            {showPrint && (
              <Stack gap="8px">
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
              </Stack>
            )}
            <MenuProspect
              only
              options={menuOptions(
                handleOpenModal,
                !prospectProducts?.ordinary_installment_for_principal
              )}
              onMouseLeave={showMenu}
            />
          </StyledContainerIcon>
        </Stack>
      )}
      <Stack direction="column">
        <CardCommercialManagement
          id={id!}
          dataRef={dataCommercialManagementRef}
          onClick={() => handleOpenModal("editProductModal")}
        />
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
          handleClose={() => setOpenModal(null)}
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
          handleClose={() => setOpenModal(null)}
          balanceOfContributions={4000000}
          accordingToRegulation={2}
          assignedQuota={1000000}
        />
      )}
      {openModal === "scoreModal" && (
        <ScoreModal
          title="Score Details"
          handleClose={() => setOpenModal(null)}
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
          title="Agregar productos"
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
    </Stack>
  );
}

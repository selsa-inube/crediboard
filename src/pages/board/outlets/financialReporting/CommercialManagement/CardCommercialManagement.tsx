import { useContext, useEffect, useState } from "react";
import { Stack, Divider, useMediaQuery } from "@inubekit/inubekit";

import { CreditProductCard } from "@components/cards/CreditProductCard";
import { NewCreditProductCard } from "@components/cards/CreditProductCard/newCard";
import { CardValues } from "@components/cards/cardValues";
import { DeleteModal } from "@components/modals/DeleteModal";
import { ConsolidatedCredits } from "@components/modals/ConsolidatedCreditModal";
import { SummaryProspectCredit } from "@pages/board/outlets/financialReporting/CommercialManagement/config/config";
import { deleteCreditProductMock } from "@mocks/utils/deleteCreditProductMock.service";
import { getSearchProspectSummaryById } from "@services/prospects/ProspectSummaryById";
import { AppContext } from "@context/AppContext";
import { IProspect, ICreditProduct } from "@services/prospects/types";
import { Schedule } from "@services/enums";
import { DeductibleExpensesModal } from "@components/modals/DeductibleExpensesModal";
import { IProspectSummaryById } from "@services/prospects/ProspectSummaryById/types";

import { StyledCardsCredit, StyledPrint } from "./styles";

interface CardCommercialManagementProps {
  id: string;
  dataRef: React.RefObject<HTMLDivElement>;
  onClick: () => void;
  prospectData?: IProspect;
  refreshProducts?: () => void;
}

export const CardCommercialManagement = (
  props: CardCommercialManagementProps
) => {
  const { dataRef, id, onClick, prospectData } = props;
  const [prospectProducts, setProspectProducts] = useState<ICreditProduct[]>(
    []
  );
  const { businessUnitSigla } = useContext(AppContext);
  const businessUnitPublicCode: string =
    JSON.parse(businessUnitSigla).businessUnitPublicCode;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [prospectSummaryData, setProspectSummaryData] =
    useState<IProspectSummaryById>();
  const [showConsolidatedModal, setShowConsolidatedModal] = useState(false);
  const [showDeductibleExpensesModal, setDeductibleExpensesModal] =
    useState(false);

  useEffect(() => {
    if (prospectData?.credit_products) {
      setProspectProducts(prospectData?.credit_products);
    }
  }, [prospectData]);

  const isMobile = useMediaQuery("(max-width: 800px)");

  const handleDelete = async () => {
    await deleteCreditProductMock(
      id,
      selectedProductId,
      prospectProducts,
      setProspectProducts
    );
    setShowDeleteModal(false);
  };

  const handleDeleteClick = (creditProductId: string) => {
    setSelectedProductId(creditProductId);
    setShowDeleteModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getSearchProspectSummaryById(
          businessUnitPublicCode,
          id!
        );
        if (result) {
          setProspectSummaryData(result);
        }
      } catch (error) {
        console.error("Error al obtener los prospectos:", error);
      }
    };

    fetchData();
  }, [businessUnitPublicCode, id]);

  return (
    <div ref={dataRef}>
      <StyledCardsCredit $isMobile={isMobile}>
        <Stack
          gap="24px"
          width="fit-content"
          padding="4px 8px 16px 8px"
          direction={isMobile ? "column" : "row"}
        >
          {prospectProducts.map((entry, index) => (
            <CreditProductCard
              key={`${entry.credit_product_code}-${index}`}
              lineOfCredit={entry.line_of_credit_abbreviated_name}
              paymentMethod={
                entry.ordinary_installments_for_principal?.[0]
                  ?.payment_channel_abbreviated
              }
              loanAmount={entry.loan_amount}
              interestRate={entry.interest_rate}
              termMonths={entry.loan_term}
              periodicFee={
                entry.ordinary_installments_for_principal?.[0]
                  ?.installment_amount
              }
              schedule={entry.schedule as Schedule}
              onEdit={() => {}}
              onDelete={() => handleDeleteClick(entry.credit_product_code)}
            />
          ))}
          <StyledPrint>
            <NewCreditProductCard onClick={onClick} />
          </StyledPrint>
        </Stack>
      </StyledCardsCredit>
      {isMobile && <Divider />}
      <Stack
        gap="24px"
        margin="36px 16px 8px 8px"
        direction={isMobile ? "column" : "row"}
        justifyContent="space-between"
      >
        {SummaryProspectCredit.map((entry, index) => (
          <CardValues
            key={index}
            items={entry.item.map((item) => ({
              ...item,
              amount: String(prospectSummaryData?.[item.id] ?? 0),
            }))}
            showIcon={entry.iconEdit}
            isMobile={isMobile}
            handleEdit={() => setShowConsolidatedModal(true)}
            handleView={() => setDeductibleExpensesModal(true)}
          />
        ))}
      </Stack>
      {showDeleteModal && (
        <DeleteModal
          handleClose={() => setShowDeleteModal(false)}
          handleDelete={handleDelete}
        />
      )}
      {showConsolidatedModal && (
        <ConsolidatedCredits
          handleClose={() => setShowConsolidatedModal(false)}
          prospectData={prospectData}
        />
      )}
      {showDeductibleExpensesModal && (
        <DeductibleExpensesModal
          handleClose={() => setDeductibleExpensesModal(false)}
        />
      )}
    </div>
  );
};

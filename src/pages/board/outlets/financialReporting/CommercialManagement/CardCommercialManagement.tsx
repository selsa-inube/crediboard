import { useCallback, useEffect, useState } from "react";
import { Stack } from "@inubekit/stack";
import { useMediaQuery } from "@inubekit/hooks";
import { Divider } from "@inubekit/divider";

import { CreditProductCard } from "@components/cards/CreditProductCard";
import { CardValues } from "@components/cards/cardValues";
import { DeleteModal } from "@components/modals/DeleteModal";
import { ICreditProductProspect } from "@services/types";
import { SummaryProspectCredit } from "@pages/board/outlets/financialReporting/CommercialManagement/config/config";
import { deleteCreditProductMock } from "@mocks/utils/deleteCreditProductMock.service";
import { mockProspectCredit } from "@mocks/prospect/prospectCredit.mock";

import { StyledCardsCredit } from "./styles";

interface CardCommercialManagementProps {
  id: string;
  dataRef: React.RefObject<HTMLDivElement>;
  refreshProducts?: () => void;
  showSummaryFirstItem?: boolean;
}

export const CardCommercialManagement = (
  props: CardCommercialManagementProps
) => {
  const { dataRef, id, showSummaryFirstItem = true } = props;
  const [prospectProducts, setProspectProducts] = useState<
    ICreditProductProspect[]
  >([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");

  const loadProspectProducts = useCallback(() => {
    const foundProspect = mockProspectCredit.find(
      (prospect) => prospect.public_code === id
    );
    if (foundProspect) {
      setProspectProducts(foundProspect.credit_product);
    }
  }, [id]);

  useEffect(() => {
    loadProspectProducts();
  }, [loadProspectProducts]);

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

  return (
    <div ref={dataRef}>
      <StyledCardsCredit>
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
                entry.ordinary_installment_for_principal
                  ?.payment_channel_code || ""
              }
              loanAmount={entry.loan_amount}
              interestRate={entry.interest_rate}
              termMonths={entry.loan_term}
              periodicFee={
                entry.ordinary_installment_for_principal?.gradient_value || 0
              }
              schedule={entry.schedule}
              onEdit={() => {}}
              onDelete={() => handleDeleteClick(entry.credit_product_code)}
            />
          ))}
        </Stack>
      </StyledCardsCredit>
      {isMobile && <Divider />}
      <Stack
        gap="24px"
        margin="36px 16px 8px 8px"
        direction={isMobile ? "column" : "row"}
        justifyContent="space-between"
      >
        {SummaryProspectCredit.filter((_, index) =>
          index === 0 ? showSummaryFirstItem : true
        ).map((entry, index) => (
          <CardValues
            key={index}
            items={entry.item}
            showIcon={entry.iconEdit}
            isMobile={isMobile}
            showSummaryFirstItem={showSummaryFirstItem}
          />
        ))}
      </Stack>
      {showDeleteModal && (
        <DeleteModal
          handleClose={() => setShowDeleteModal(false)}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

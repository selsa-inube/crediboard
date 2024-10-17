import { useCallback, useEffect, useState } from "react";
import { Stack } from "@inubekit/stack";
import { CreditProductCard } from "@components/cards/CreditProductCard";
import { SummaryProspect } from "@components/inputs/SummaryOnProspect";
import { ICreditProductProspect } from "@services/types";
import { SummaryProspectCredit } from "@pages/board/outlets/financialReporting/CommercialManagement/config/config";
import { StyledCardsCredit } from "./styles";
import { mockProspectCredit } from "@mocks/prospect/prospectCredit.mock";

interface CardCommercialManagementProps {
  id: string;
  dataRef: React.RefObject<HTMLDivElement>;
}

export const CardCommercialManagement = (props: CardCommercialManagementProps) => {
  const { dataRef, id } = props;
  const [prospectProducts, setProspectProducts] = useState<ICreditProductProspect[]>([]);

  const loadProspectProducts = useCallback(() => {
    const foundProspect = mockProspectCredit.find(prospect => prospect.public_code === id);
    if (foundProspect) {
      setProspectProducts(foundProspect.credit_product);
    }
  }, [id]);

  useEffect(() => {
    loadProspectProducts(); 
  }, [loadProspectProducts]);

  return (
    <div ref={dataRef}>
      <StyledCardsCredit>
        <Stack gap="24px" width="fit-content" padding="4px 8px 16px 8px">
          {prospectProducts.map((entry) => (
            <CreditProductCard
              key={entry.credit_product_code}
              lineOfCredit={entry.line_of_credit_abbreviated_name}
              paymentMethod={entry.ordinary_installment_for_principal?.payment_channel_code || ""}
              loanAmount={entry.loan_amount}
              interestRate={entry.interest_rate}
              termMonths={entry.loan_term}
              periodicFee={entry.ordinary_installment_for_principal?.gradient_value || 0}
              schedule={entry.schedule}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          ))}
        </Stack>
      </StyledCardsCredit>
      <Stack gap="24px" margin="36px 16px 8px 8px" justifyContent="space-between">
        {SummaryProspectCredit.map((entry, index) => (
          <SummaryProspect
            key={index}
            items={entry.item}
            showIcon={entry.iconEdit}
          />
        ))}
      </Stack>
    </div>
  );
};

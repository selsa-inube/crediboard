import { useEffect, useState } from "react";
import { Stack } from "@inubekit/stack";
import { useMediaQuery } from "@inubekit/hooks";
import { Divider } from "@inubekit/divider";

import { CreditProductCard } from "@components/cards/CreditProductCard";
import { SummaryProspect } from "@components/inputs/SummaryOnProspect";
import { getById } from "@mocks/utils/dataMock.service";
import { ICreditProductProspect } from "@services/types";
import { SummaryProspectCredit } from "@pages/board/outlets/financialReporting/CommercialManagement/config/config";

import { StyledCardsCredit } from "./styles";

interface CardCommercialManagementProps {
  id: string;
  dataRef: React.RefObject<HTMLDivElement>;
}

export const CardCommercialManagement = (
  props: CardCommercialManagementProps
) => {
  const { dataRef, id } = props;
  const [prospectProducts, setProspectProducts] = useState<
    ICreditProductProspect[]
  >([]);

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
                  .flat()
              );
            }
          }
        }
      );
    } catch (error) {
      console.log("error", error);
    }
  }, [id]);

  const isMobile = useMediaQuery("(max-width: 800px)");

  return (
    <div ref={dataRef}>
      <StyledCardsCredit>
        <Stack
          gap="24px"
          width="fit-content"
          padding="4px 8px 16px 8px"
          direction={isMobile ? "column" : "row"}
        >
            {prospectProducts.map((entry) => (
              <CreditProductCard
                key={entry.credit_product_code}
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
                onDelete={() => {}}
              />
            ))}
        </Stack>
        {isMobile && <Divider />}
      </StyledCardsCredit>
      <Stack
        gap="24px"
        margin="36px 16px 8px 8px"
        direction={isMobile ? "column" : "row"}
        justifyContent="space-between"
      >
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

import { useEffect, useState } from "react";
import { Stack } from "@inubekit/stack";
import { CreditProductCard } from "@components/cards/CreditProductCard";
import { SummaryProspect } from "@components/inputs/SummaryOnProspect";
import { getDataById } from "@mocks/utils/dataMock.service";
import { ProspectsResponse, CreditProduct } from "@src/services/types";
import { Schedule } from "@src/services/enums";

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
  const [prospectCredt, setProspectCredt] = useState<CreditProduct[]>([]);
  useEffect(() => {
    try {
      Promise.allSettled([
        getDataById<ProspectsResponse[]>("prospects", "credit_request_id", id),
      ]).then(([prospects]) => {
        if (prospects.status === "fulfilled" && prospects.value) {
          if (!(prospects.value instanceof Error)) {
            const propectsCredit = prospects.value
              .map((dataPropects) => dataPropects.prospect.credit_products)
              .flat();
            setProspectCredt(propectsCredit);
          }
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  }, [id]);

  return (
    <div ref={dataRef}>
      <StyledCardsCredit>
        <Stack gap="24px" width="fit-content" padding="4px 8px 16px 8px">
          {prospectCredt &&
            prospectCredt.map((entry) => (
              <CreditProductCard
                key={entry.line_of_credit_id}
                lineOfCredit={entry.line_of_credit_id}
                paymentMethod={entry.payment_channel_for_principal}
                loanAmount={entry.loan_amount}
                interestRate={entry.interest_rate}
                termMonths={entry.loan_term}
                periodicFee={entry.quota}
                schedule={Schedule.Weekly}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            ))}
        </Stack>
      </StyledCardsCredit>
      <Stack gap="24px" margin="35px 0px 8px 0px" padding="0px 8px" width="100%" justifyContent="space-around">
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

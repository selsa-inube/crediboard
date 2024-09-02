import { CreditProductCard } from "@src/components/cards/CreditProductCard";
import SummaryProspect from "@src/components/inputs/SummaryOnProspect";

import {
  entriesCommercialManagementCard,
  SummaryProspectCredit,
} from "@pages/board/outlets/financialReporting/CommercialManagement/config/config";
import {
  StyledCardsCredit,
  StyledSumaryPropect,
  StyledContainerCardPropect,
} from "./styles";

interface CardCommercialManagementProps {
  dataRef: React.RefObject<HTMLDivElement>;
}

export const CardCommercialManagement = (
  props: CardCommercialManagementProps
) => {
  const { dataRef } = props;
  return (
    <StyledContainerCardPropect ref={dataRef}>
      <StyledCardsCredit>
        {entriesCommercialManagementCard.map((entry, index) => (
          <CreditProductCard
            key={index}
            lineOfCredit={entry.lineOfCredit}
            paymentMethod={entry.paymentMethod}
            loanAmount={entry.loanAmount}
            interestRate={entry.interestRate}
            termMonths={entry.termMonths}
            periodicFee={entry.periodicFee}
            schedule={entry.schedule}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        ))}
      </StyledCardsCredit>
      <StyledSumaryPropect>
        {SummaryProspectCredit.map((entry, index) => (
          <SummaryProspect
            key={index}
            items={entry.item}
            showIcon={entry.iconEdit}
          />
        ))}
      </StyledSumaryPropect>
    </StyledContainerCardPropect>
  );
};

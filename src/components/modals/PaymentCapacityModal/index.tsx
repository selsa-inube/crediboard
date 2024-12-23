import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Blanket } from "@inubekit/blanket";
import { useMediaQuery } from "@inubekit/hooks";
import { PaymentCapacityInterface } from "./interface";

export interface PaymentCapacityProps {
  title: string;
  handleClose: () => void;
  portalId?: string;
  reportedIncomeSources: number;
  reportedFinancialObligations: number;
  subsistenceReserve: number;
  availableForNewCommitments: number;
  maxVacationTerm: number;
  maxAmount: number;
  iconVisible?: boolean;
  loading?: boolean;
}

export const PaymentCapacity = (props: PaymentCapacityProps) => {
  const {
    title,
    portalId,
    handleClose,
    reportedIncomeSources,
    reportedFinancialObligations,
    subsistenceReserve,
    availableForNewCommitments,
    maxVacationTerm,
    maxAmount,
    iconVisible,
    loading = false,
  } = props;

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error(
      "The portal node is not defined. Ensure the portal has been set correctly."
    );
  }

  const isMobile = useMediaQuery("(max-width: 700px)");

  const [error, setError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 2000);
  }, []);

  return createPortal(
    <Blanket>
      <PaymentCapacityInterface
        loading={loading}
        error={error}
        handleClose={handleClose}
        title={title}
        isMobile={isMobile}
        reportedIncomeSources={reportedIncomeSources}
        reportedFinancialObligations={reportedFinancialObligations}
        subsistenceReserve={subsistenceReserve}
        availableForNewCommitments={availableForNewCommitments}
        maxVacationTerm={maxVacationTerm}
        maxAmount={maxAmount}
        iconVisible={iconVisible}
      />
    </Blanket>,
    node
  );
};

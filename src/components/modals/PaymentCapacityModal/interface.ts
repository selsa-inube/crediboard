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
  }
  
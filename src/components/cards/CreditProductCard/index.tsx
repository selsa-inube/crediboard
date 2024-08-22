import { CreditProductCardUI } from "./interface";

interface CreditProductCardProps {
  title: string;
  paymentMethod: string;
  loanAmount: number;
  interestRate: number;
  termMonths: number;
  periodicFee: number;
  paymentCycle: string;
  onEdit: () => void;
  onDelete: () => void;
}

function CreditProductCard(props: CreditProductCardProps) {
  const {
    title,
    paymentMethod,
    loanAmount,
    interestRate,
    termMonths,
    periodicFee,
    paymentCycle,
    onEdit,
    onDelete,
  } = props;

  return (
    <CreditProductCardUI
      title={title}
      paymentMethod={paymentMethod}
      loanAmount={loanAmount}
      interestRate={interestRate}
      termMonths={termMonths}
      periodicFee={periodicFee}
      paymentCycle={paymentCycle}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}

export { CreditProductCard };
export type { CreditProductCardProps };

import { SourceIncome } from "@pages/prospect/components/SourceIncome";

interface ISourcesOfIncomeProps {
  onChange: (name: string, newValue: string) => void;
  incomeData: {
    debtor: string;
    monthly_salary?: number;
    other_monthly_payments?: number;
    pension_allowances?: number;
    leases?: number;
    dividends_or_shares?: number;
    financial_returns?: number;
    average_monthly_profit?: number;
    monthly_fees?: number;
  };
  options: { id: string; label: string; value: string }[];
}

export function SourcesOfIncome(props: ISourcesOfIncomeProps) {
  const { incomeData, onChange, options } = props;

  return <SourceIncome form={incomeData} onChange={onChange} options={options} />;
}

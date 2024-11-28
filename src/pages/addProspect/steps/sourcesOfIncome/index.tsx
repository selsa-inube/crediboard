import { SourceIncome } from "@pages/prospect/components/SourceIncome";
import { Fieldset } from "@src/components/data/Fieldset";

interface ISourcesOfIncomeProps {
  handleOnChange: (name: string, newValue: string) => void;
  initialValues: {
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
  const { initialValues, handleOnChange, options } = props;

  return (
    <Fieldset>
      <SourceIncome
        form={initialValues}
        onChange={handleOnChange}
        options={options}
        noShowSupport={true}
        onlyDebtor
      />
    </Fieldset>
  );
}

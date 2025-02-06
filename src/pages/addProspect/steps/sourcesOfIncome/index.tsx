import { SourceIncome } from "@pages/prospect/components/SourceIncome";
import { Fieldset } from "@components/data/Fieldset";
import { Stack } from "@inubekit/stack";

interface ISourcesOfIncomeProps {
  handleOnChange: (name: string, newValue: string) => void;
  initialValues: {
    borrower: string;
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
  isMobile: boolean;
}

export function SourcesOfIncome(props: ISourcesOfIncomeProps) {
  const { initialValues, handleOnChange, options, isMobile } = props;

  return (
    <Fieldset>
      <Stack padding={isMobile ? "6px" : "0px"} justifyContent="center">
        <SourceIncome
          form={initialValues}
          onChange={handleOnChange}
          options={options}
          onlyDebtor
        />
      </Stack>
    </Fieldset>
  );
}

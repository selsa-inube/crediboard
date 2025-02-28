import { useEffect, useState } from "react";
import { useMediaQuery } from "@inubekit/hooks";

import { BaseModal } from "@components/modals/baseModal";
import { SourceIncome } from "@pages/prospect/components/SourceIncome";

import { dataIncomeModal } from "./config";

interface IncomeModalProps {
  onChange: (name: string, newValue: string) => void;
  handleClose: () => void;
  form: {
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
}

export function IncomeModal(props: IncomeModalProps) {
  const { onChange, handleClose, form, options } = props;

  const [isFormComplete, setIsFormComplete] = useState(false);

  useEffect(() => {
    const allFieldsFilled = [
      form.borrower,
      form.monthly_salary,
      form.other_monthly_payments,
      form.pension_allowances,
      form.leases,
      form.dividends_or_shares,
      form.financial_returns,
      form.average_monthly_profit,
      form.monthly_fees,
    ].every((field) => field !== undefined && field !== "");

    setIsFormComplete(allFieldsFilled);
  }, [form]);

  const isMobile = useMediaQuery("(max-width:880px)");

  return (
    <BaseModal
      title={dataIncomeModal.title}
      nextButton={dataIncomeModal.save}
      backButton={dataIncomeModal.close}
      handleNext={handleClose}
      handleBack={handleClose}
      width={isMobile ? "auto" : "1002px"}
      disabledNext={!isFormComplete}
      finalDivider={true}
    >
      <SourceIncome
        form={form}
        onChange={onChange}
        options={options}
        ShowSupport
      />
    </BaseModal>
  );
}

export type { IncomeModalProps };

import { useState, useEffect } from "react";
import { Stack } from "@inubekit/stack";
import { Divider } from "@inubekit/divider";
import { Text } from "@inubekit/text";
import { useMediaQuery } from "@inubekit/hooks";

import { CardConsolidatedCredit } from "@components/cards/CardConsolidatedCredit";
import { currencyFormat } from "@utils/formatData/currency";
import { mockConsolidatedCredit } from "@mocks/add-prospect/consolidates-credit/consolidatedcredit.mock";

import { dataConsolidated } from "./config";

interface IConsolidatedCreditProps {
  initialValues: {
    totalCollected: number;
    selectedValues: Record<string, number>;
  };
  handleOnChange: (
    creditId: string,
    oldValue: number,
    newValue: number
  ) => void;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ConsolidatedCredit(props: IConsolidatedCreditProps) {
  const { initialValues, handleOnChange, onFormValid } = props;

  const [totalCollected, setTotalCollected] = useState(
    initialValues.totalCollected
  );

  useEffect(() => {
    const hasSelectedValues = Object.values(initialValues.selectedValues).some(
      (value) => value > 0
    );
    onFormValid(hasSelectedValues);
  }, [initialValues.selectedValues, onFormValid]);

  const handleUpdateTotal = (
    creditId: string,
    oldValue: number,
    newValue: number
  ) => {
    setTotalCollected((prevTotal) => prevTotal - oldValue + newValue);
    handleOnChange(creditId, oldValue, newValue);

    const isFormValid = newValue > 0 || Object.values(initialValues.selectedValues).some(
      (value) => value > 0 && value !== oldValue
    );
    onFormValid(isFormValid);
  };

  const debtorData = mockConsolidatedCredit[0]; 
  const isMobile = useMediaQuery("(max-width:880px)");

  return (
    <Stack direction="column" gap="24px">
      <Text type="body" size="medium">
        {dataConsolidated.select}
      </Text>
      <Stack justifyContent="space-between" alignItems="end">
        <Stack direction="column">
          <Text type="body" size="small" weight="bold" appearance="gray">
            {dataConsolidated.debtor}
          </Text>
          <Text type="title" size="medium">
            {debtorData.name}
          </Text>
        </Stack>
        <Stack direction="column" alignItems="center">
          <Text type="headline" size="large" weight="bold" appearance="primary">
            {currencyFormat(totalCollected)}
          </Text>
          <Text type="body" size="small" appearance="gray">
            {dataConsolidated.totalvalue}
          </Text>
        </Stack>
      </Stack>
      <Divider />
      <Stack gap="16px" wrap="wrap" justifyContent={isMobile ? "center" : "initial"}>
        {debtorData.data_card.map((creditData) => (
          <CardConsolidatedCredit
            key={creditData.consolidated_credit_id}
            title={creditData.consolidated_credit_title}
            code={creditData.consolidated_credit_code}
            expiredValue={creditData.expired_value}
            nextDueDate={creditData.next_due_date}
            fullPayment={creditData.full_payment}
            date={new Date(creditData.date)}
            onUpdateTotal={(oldValue, newValue) =>
              handleUpdateTotal(
                creditData.consolidated_credit_id,
                oldValue,
                newValue
              )
            }
            arrears={creditData.arrears === "Y"}
            initialValue={
              initialValues.selectedValues[
                creditData.consolidated_credit_id
              ]
            }
          />
        ))}
      </Stack>
    </Stack>
  );
}

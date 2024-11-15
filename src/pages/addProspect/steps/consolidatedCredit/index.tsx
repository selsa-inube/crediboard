import { useState } from "react";
import { Stack } from "@inubekit/stack";
import { Divider } from "@inubekit/divider";
import { Text } from "@inubekit/text";

import { CardConsolidatedCredit } from "@components/cards/CardConsolidatedCredit";
import { currencyFormat } from "@utils/formatData/currency";
import { mockConsolidatedCredit } from "@mocks/add-prospect/consolidates-credit/consolidatedcredit.mock";

import { dataConsolidated } from "./config";

export function ConsolidatedCredit() {
  const [totalCollected, setTotalCollected] = useState(0);

  const handleUpdateTotal = (oldValue: number, newValue: number) => {
    setTotalCollected((prevTotal) => prevTotal - oldValue + newValue);
  };

  const debtorData = mockConsolidatedCredit[0];

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
            {mockConsolidatedCredit[0].name}
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
      <Stack gap="16px">
        {debtorData.data_card.map((creditData) => (
          <CardConsolidatedCredit
            key={creditData.consolidated_credit_id}
            title={creditData.consolidated_credit_title}
            code={creditData.consolidated_credit_code}
            expiredValue={creditData.expired_value}
            nextDueDate={creditData.next_due_date}
            fullPayment={creditData.full_payment}
            date={new Date(creditData.date)}
            onUpdateTotal={handleUpdateTotal}
            arrears={creditData.arrears === "Y"}
          />
        ))}
      </Stack>
    </Stack>
  );
}

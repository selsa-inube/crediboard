import { Stack } from "@inubekit/stack";

import { CardGray } from "@components/cards/CardGray";
import { Fieldset } from "@components/data/Fieldset";
import { MockIncomeDebtor } from "@mocks/filing-application/add-borrower/addborrower.mock";

import { dataIncomeDebtor } from "./config";

export function IncomeDebtor() {
  const data = MockIncomeDebtor[0];

  return (
    <Fieldset>
      <Stack direction="column" padding="10px 16px" gap="16px">
        <CardGray
          label={dataIncomeDebtor.work}
          placeHolder={data.work}
          apparencePlaceHolder="gray"
        />
        <CardGray
          label={dataIncomeDebtor.capital}
          placeHolder={data.capital}
          apparencePlaceHolder="gray"
        />
        <CardGray
          label={dataIncomeDebtor.variables}
          placeHolder={data.variables}
          apparencePlaceHolder="gray"
        />
      </Stack>
    </Fieldset>
  );
}

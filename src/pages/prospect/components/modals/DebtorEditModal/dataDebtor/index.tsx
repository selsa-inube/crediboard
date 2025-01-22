import { Stack } from "@inubekit/stack";
import { Textfield } from "@inubekit/textfield";

import { Fieldset } from "@components/data/Fieldset";
import { MockEditDebtor } from "@mocks/filing-application/add-borrower/addborrower.mock";

import { DataEditBorrower } from "./config";

export function DataDebtor() {
  const data = MockEditDebtor[0];

  return (
    <Fieldset>
      <Stack direction="column" gap="16px" padding="10px 16px">
        <Textfield
          name="email"
          id="email"
          label={DataEditBorrower.email}
          value={data.email}
          size="compact"
        />
        <Textfield
          name="phone"
          id="phone"
          label={DataEditBorrower.phone}
          value={data.phone}
          size="compact"
        />
        <Textfield
          name="relation"
          id="relation"
          label={DataEditBorrower.relation}
          value={data.relation}
          size="compact"
        />
      </Stack>
    </Fieldset>
  );
}

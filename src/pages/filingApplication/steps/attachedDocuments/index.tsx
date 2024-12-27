import { Stack } from "@inubekit/stack";

import { Fieldset } from "@components/data/Fieldset";
import { TableAttachedDocuements } from "@pages/prospect/components/tableAttachedDocuements";

export function AttachedDocuments() {
  return (
    <Fieldset>
      <Stack padding="16px">
        <TableAttachedDocuements />
      </Stack>
    </Fieldset>
  );
}

import { Stack } from "@inube/design-system";

import { Fieldset } from "@src/components/data/Fieldset";
import { TableBoard } from "@src/components/data/TableBoard";
import { entriesPostingvouchers, titlesPostingvouchers } from "./config";

export const Postingvouchers = () => {
  return (
    <Stack direction="column">
      <Fieldset title="Comprobantes de Contabilización">
        <TableBoard
          id="postingvouchers"
          titles={titlesPostingvouchers}
          entries={entriesPostingvouchers}
        />
      </Fieldset>
    </Stack>
  );
};

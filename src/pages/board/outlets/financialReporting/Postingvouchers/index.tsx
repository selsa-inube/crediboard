import { Stack } from "@inube/design-system";

import { Fieldset } from "@src/components/data/Fieldset";
import { TableBoard } from "@src/components/data/TableBoard";
import {
  actionsPostingvouchers,
  entriesPostingvouchers,
  titlesPostingvouchers,
} from "./config";

export const Postingvouchers = () => {
  return (
    <Stack direction="column">
      <Fieldset
        title="Comprobantes de Contabilización"
        heightFieldset="163px"
        hasTable
      >
        <TableBoard
          id="postingvouchers"
          loading={false}
          titles={titlesPostingvouchers}
          entries={entriesPostingvouchers}
          actions={actionsPostingvouchers}
          appearanceTable={{
            efectzebra: true,
            title: "primary",
          }}
        />
      </Fieldset>
    </Stack>
  );
};

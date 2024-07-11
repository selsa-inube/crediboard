import { Stack } from "@inube/design-system";

import { Fieldset } from "@src/components/data/Fieldset";
import { TableBoard } from "@src/components/data/TableBoard";
import {
  actionMobile,
  actionsFinanacialReporting,
  entriesFinanacialReporting,
  titlesFinanacialReporting,
} from "./config";

export const PromissoryNotes = () => {
  return (
    <Stack direction="column">
      <Fieldset title="Pagarés y Libranzas" heightFieldset="163px" hasTable>
        <TableBoard
          id="promissoryNotes"
          titles={titlesFinanacialReporting}
          entries={entriesFinanacialReporting}
          actions={actionsFinanacialReporting}
          actionMobile={actionMobile}
          appearanceTable={{
            efectzebra: true,
            title: "primary",
            isStyleMobile: true,
          }}
        />
      </Fieldset>
    </Stack>
  );
};

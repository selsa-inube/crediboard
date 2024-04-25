import { Stack } from "@inube/design-system";

import { Fieldset } from "@src/components/data/Fieldset";
import { TableBoard } from "@src/components/data/TableBoard";
import {
  entriesFinanacialReporting,
  titlesFinanacialReporting,
} from "./config";

export const PromissoryNotes = () => {
  return (
    <Stack direction="column" margin="s100">
      <Fieldset title="Pagarés y Libranzas">
        <TableBoard
          id="promissoryNotes"
          titles={titlesFinanacialReporting}
          entries={entriesFinanacialReporting}
        />
      </Fieldset>
    </Stack>
  );
};

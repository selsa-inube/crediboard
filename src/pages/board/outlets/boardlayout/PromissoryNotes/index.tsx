import { Stack } from "@inube/design-system";

import { Fieldset } from "@src/components/data/Fieldset";
import { TableBoard } from "@src/components/data/TableBoard";
import {
  entriesFinanacialReporting,
  titlesFinanacialReporting,
} from "./config";

export const PromissoryNotes = () => {
  return (
    <Stack direction="column">
      <Fieldset title="Pagarés y Libranzas" heigthFieldset="163px">
        <TableBoard
          id="promissoryNotes"
          titles={titlesFinanacialReporting}
          entries={entriesFinanacialReporting}
        />
      </Fieldset>
    </Stack>
  );
};

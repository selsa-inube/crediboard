import { Stack } from "@inube/design-system";

import { Fieldset } from "@src/components/data/Fieldset";
import { TableBoard } from "@src/components/data/TableBoard";
import {
  actionsPostingvouchers,
  entriesPostingvouchers,
  titlesPostingvouchers,
  actionMobile 
} from "./config";

export const Postingvouchers = () => {
  return (
    <Stack direction="column">
      <Fieldset
        title="Comprobantes de Contabilización"
        heightFieldset="163px"
        aspectRatio="1"
        hasTable
      >
        <TableBoard
          id="postingvouchers"
          loading={false}
          titles={titlesPostingvouchers}
          entries={entriesPostingvouchers}
          actions={actionsPostingvouchers}
          actionMobile={actionMobile}
          appearanceTable={{
            efectzebra: true,
            title: "primary",
            isStyleMobile: true,
          }}
          isFirstTable={true}
        />
      </Fieldset>
    </Stack>
  );
};

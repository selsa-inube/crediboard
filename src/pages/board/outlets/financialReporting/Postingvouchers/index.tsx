import { Stack } from "@inubekit/inubekit";

import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";

import {
  actionsPostingvouchers,
  entriesPostingvouchers,
  titlesPostingvouchers,
  actionMobile,
} from "./config";
import { errorMessages } from "../config";

export const Postingvouchers = () => {
  return (
    <Stack direction="column">
      <Fieldset
        title={errorMessages.Postingvouchers.titleCard}
        heightFieldset="100%"
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

import { useState } from "react";
import { Stack } from "@inube/design-system";
import { Fieldset } from "@src/components/data/Fieldset";
import { TableBoard } from "@src/components/data/TableBoard";
import {
  getTableBoardActions,
  getTableBoardActionMobile,
  entriesFinanacialReporting,
  titlesFinanacialReporting,
} from "./config";
import { PromissoryNotesModal } from "@components/modals/PromissoryNotesModal";

export const PromissoryNotes = () => {
  const [showModal, setShowModal] = useState(false);

  const tableBoardActions = getTableBoardActions(() => setShowModal(true));
  const tableBoardActionMobile = getTableBoardActionMobile(() => setShowModal(true));

  const formValues = {
    field1: "usuario@inube.com",
    field2: "3122638128",
    field3: "3122638128"
  };

  return (
    <Stack direction="column">
      <Fieldset title="Pagarés y Libranzas" heightFieldset="163px" hasTable>
        <TableBoard
          id="promissoryNotes"
          titles={titlesFinanacialReporting}
          entries={entriesFinanacialReporting}
          actions={tableBoardActions}
          actionMobile={tableBoardActionMobile}
          appearanceTable={{
            efectzebra: true,
            title: "primary",
            isStyleMobile: true,
          }}
        />
      </Fieldset>
      {showModal && (
        <PromissoryNotesModal
          title="Confirma los datos del usuario"
          buttonText="Enviar"
          formValues={formValues}
          onCloseModal={() => setShowModal(false)}
          handleClose={() => setShowModal(false)}
        />
      )}
    </Stack>
  );
};

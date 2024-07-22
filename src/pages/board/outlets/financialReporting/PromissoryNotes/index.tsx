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
          title="Gestor Comercial y Analista"
          buttonText="Aceptar"
          onCloseModal={() => setShowModal(false)}
          onSubmit={(values) => {
            console.log("Form submitted with values:", values);
            setShowModal(false);
          }}
        />
      )}
    </Stack>
  );
};

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
import { IEntries } from "@components/data/TableBoard/types";

export const PromissoryNotes = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const entrySelection = (data: IEntries) => {
    console.log(data);
    setShowModal(true);
  };

  const tableBoardActions = getTableBoardActions(entrySelection);
  const tableBoardActionMobile = getTableBoardActionMobile(entrySelection);

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
          onCloseModal={handleCloseModal}
          onSubmit={(values) => {
            console.log("Form submitted with values:", values);
            handleCloseModal();
          }}
        />
      )}
    </Stack>
  );
};

import { useState } from "react";
import { Stack } from "@inube/design-system";
import { Fieldset } from "@src/components/data/Fieldset";
import { TableBoard } from "@src/components/data/TableBoard";
import {
  actionsFinanacialReporting,
  entriesFinanacialReporting,
  titlesFinanacialReporting,
} from "./config";
import { PromissoryNotesModal } from "@components/modals/PromissoryNotesModal";

export const PromissoryNotes = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSendButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Stack direction="column">
      <Fieldset title="Pagarés y Libranzas">
        <TableBoard
          id="promissoryNotes"
          titles={titlesFinanacialReporting}
          entries={entriesFinanacialReporting}
          actions={actionsFinanacialReporting(handleSendButtonClick)}
          appearanceTable={{
            efectzebra: true,
            title: "primary",
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

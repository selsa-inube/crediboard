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

  return (
    <Stack direction="column">
      <Fieldset title="Pagarés y Libranzas">
        <TableBoard
          id="promissoryNotes"
          titles={titlesFinanacialReporting}
          entries={entriesFinanacialReporting}
          actions={actionsFinanacialReporting}
          appearanceTable={{
            efectzebra: true,
            title: "primary",
          }}
        />
        <button onClick={handleSendButtonClick}>Enviar</button>
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

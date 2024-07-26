import { useState } from "react";
import { Stack, useMediaQuery} from "@inube/design-system";

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


  const isMobile = useMediaQuery("(max-width: 720px)");

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
            widthTd: !isMobile ? "100" : "20%",
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

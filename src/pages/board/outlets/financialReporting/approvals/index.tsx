import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import { actionsApprovals, entriesApprobals, titlesApprobals } from "./config";

export const Approbals = () => {
  return (
    <Fieldset title="Aprobaciones">
      <TableBoard
        id="usuarios"
        titles={titlesApprobals}
        entries={entriesApprobals}
        actions={actionsApprovals}
      />
    </Fieldset>
  );
};

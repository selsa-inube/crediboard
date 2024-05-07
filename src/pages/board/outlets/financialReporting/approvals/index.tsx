import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import { actionsApprovals, entriesApprovals, titlesApprovals } from "./config";

export const Approvals = () => {
  return (
    <Fieldset title="Aprobaciones">
      <TableBoard
        id="usuarios"
        titles={titlesApprovals}
        entries={entriesApprovals}
        actions={actionsApprovals}
      />
    </Fieldset>
  );
};

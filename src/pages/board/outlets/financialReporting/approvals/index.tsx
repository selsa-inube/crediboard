import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import { entriesApprovals, titlesApprovals } from "./config";

export const Approvals = () => {
  return (
    <Fieldset title="Aprovaciones">
      <TableBoard
        id="usuarios"
        titles={titlesApprovals}
        entries={entriesApprovals}
      />
    </Fieldset>
  );
};

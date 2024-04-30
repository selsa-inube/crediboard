import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import { entriesApprobals, titlesApprobals } from "./config";

export const Approbals = () => {
  return (
    <Fieldset title="Aprobaciones">
      <TableBoard
        id="usuarios"
        titles={titlesApprobals}
        entries={entriesApprobals}
      />
    </Fieldset>
  );
};

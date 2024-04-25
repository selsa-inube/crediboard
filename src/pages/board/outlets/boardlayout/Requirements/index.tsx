import { Stack } from "@inube/design-system";

import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import { IAction, IEntries, ITitle } from "@components/data/TableBoard/types";

interface IData {
  titlesRequirements: ITitle[];
  entriesRequirements: IEntries[];
  actionsRequirements: IAction[];
}

export interface IRequirementsProps {
  data: IData[];
}
export const Requirements = (props: IRequirementsProps) => {
  const { data } = props;

  return (
    <Stack>
      <Fieldset title="Requerimientos">
        {data.map((item, index) => (
          <TableBoard
            key={index}
            id={index.toString()}
            titles={item.titlesRequirements}
            entries={item.entriesRequirements}
            actions={item.actionsRequirements}
          />
        ))}
      </Fieldset>
    </Stack>
  );
};

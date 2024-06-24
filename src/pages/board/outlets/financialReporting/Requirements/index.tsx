import { Stack } from "@inube/design-system";

import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import { IAction, IEntries, ITitle } from "@components/data/TableBoard/types";
import { dataButton } from "./config";

interface IData {
  id: string;
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
      <Fieldset
        title="Requisitos"
        activeButton={dataButton}
        heigthFieldset="340px"
      >
        <div style={{ height: "340px" }}>
          {data.map((item) => (
            <TableBoard
              key={item.id}
              id={item.id}
              titles={item.titlesRequirements}
              entries={item.entriesRequirements}
              actions={item.actionsRequirements}
              appearanceTable={{
                widthTd: "310px",
                efectzebra: true,
                title: "primary",
                isStyleMobile: false,
              }}
            />
          ))}
        </div>
      </Fieldset>
    </Stack>
  );
};

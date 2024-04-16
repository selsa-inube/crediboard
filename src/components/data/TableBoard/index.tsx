import { transformData } from "./utils";
import { TableBoardUI } from "./interface";
import { IAction, IEntries } from "./types";

export interface ITableBoardProps {
  id: string;
  withTitles: boolean;
  colspan?: string;
  entries: IEntries[];
  actions?: IAction[];
}

export const TableBoard = (props: ITableBoardProps) => {
  const { id, entries, withTitles, actions, colspan = "1" } = props;

  const normalizedEntries = transformData(entries);

  console.log(actions?.length, "actions");

  return (
    <TableBoardUI
      id={id}
      entries={entries}
      withTitles={withTitles}
      colspan={colspan}
      normalizedEntries={normalizedEntries}
      actions={actions}
    />
  );
};

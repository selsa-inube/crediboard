import { IAction, IEntries, ITitle } from "./types";
import { TableBoardUI } from "./interface";

export interface ITableBoardProps {
  id: string;
  borderTable?: boolean;
  titles: ITitle[];
  entries: IEntries[];
  actions?: IAction[];
}

export const TableBoard = (props: ITableBoardProps) => {
  const { id, entries, actions, titles, borderTable = false } = props;
  const titlesList = Object.keys(entries[0]).filter((key) => key !== "id");

  return (
    <TableBoardUI
      id={id}
      entries={entries}
      titles={titles}
      actions={actions}
      borderTable={borderTable}
      titlesList={titlesList}
    />
  );
};

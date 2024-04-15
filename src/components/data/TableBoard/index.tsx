import { ITableBoardProps } from "./types";

import { TableBoardUI } from "./interface";
import { transformData } from "./stories/utils";

export const TableBoard = (props: ITableBoardProps) => {
  const { id, entries, withTitles, colspan = "1" } = props;

  const normalizedEntries = transformData(entries);

  return (
    <TableBoardUI
      id={id}
      entries={entries}
      withTitles={withTitles}
      colspan={colspan}
      normalizedEntries={normalizedEntries}
    />
  );
};

import { IAction, IEntries, ITitle } from "./types";
import { TableBoardUI } from "./interface";

export interface ITableBoardProps {
  id: string;
  portalId?: string;
  titles: ITitle[];
  entries: IEntries[];
  actions?: IAction[];
  borderTable?: boolean;
  loading?: boolean;
}

export const TableBoard = (props: ITableBoardProps) => {
  const {
    id,
    portalId,
    titles,
    actions,
    entries,
    loading = false,
    borderTable = false,
  } = props;

  const titlesList = titles.map((title) => title.id);

  return (
    <TableBoardUI
      id={id}
      portalId={portalId}
      entries={entries}
      titles={titles}
      actions={actions}
      borderTable={borderTable}
      titlesList={titlesList}
      loading={loading}
    />
  );
};

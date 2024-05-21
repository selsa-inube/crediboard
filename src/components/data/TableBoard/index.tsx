import { IAction, IEntries, ITitle } from "./types";
import { TableBoardUI } from "./interface";

export interface ITableBoardProps {
  id: string;
  entries: IEntries[];
  titles: ITitle[];
  actions?: IAction[];
  borderTable?: boolean;
  loading?: boolean;
  portalId?: string;
}

export const TableBoard = (props: ITableBoardProps) => {
  const {
    id,
    entries,
    titles,
    actions,
    loading = false,
    borderTable = false,
    portalId,
  } = props;

  const titlesList = titles.map((title) => title.id);

  return (
    <TableBoardUI
      id={id}
      actions={actions}
      entries={entries}
      borderTable={borderTable}
      loading={loading}
      portalId={portalId}
      titles={titles}
      titlesList={titlesList}
    />
  );
};

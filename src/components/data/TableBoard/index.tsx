import { IAction, IEntries, ITitle, appearances } from "./types";
import { TableBoardUI } from "./interface";

export interface ITableBoardProps {
  id: string;
  entries: IEntries[];
  titles: ITitle[];
  actions?: IAction[];
  borderTable?: boolean;
  loading?: boolean;
  portalId?: string;
  efectzebra?: boolean;
  appearanceTitles?: appearances;
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
    efectzebra = true,
    appearanceTitles = "primary",
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
      efectzebra={efectzebra}
      appearanceTitles={appearanceTitles}
    />
  );
};

import { useMediaQuery } from "@inube/design-system";

import { IAction, IEntries, ITitle, IAppearances } from "./types";
import { TableBoardUI } from "./interface";

export interface ITableBoardProps {
  id: string;
  entries: IEntries[];
  titles: ITitle[];
  actions?: IAction[];
  borderTable?: boolean;
  loading?: boolean;
  portalId?: string;
  appearanceTable?: IAppearances;
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
    appearanceTable = {
      title: "primary",
      efectzebra: true,
      borderTable: false,
      background: false,
    },
  } = props;

  const titlesList = titles.map((title) => title.id);

  const isTablet = useMediaQuery("(max-width: 850px)");

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
      appearanceTable={appearanceTable}
      isTablet={isTablet}
    />
  );
};

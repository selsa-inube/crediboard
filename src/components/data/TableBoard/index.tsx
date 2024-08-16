import { useMediaQuery } from "@inubekit/hooks";

import { IAction, IEntries, ITitle, IAppearances } from "./types";
import { TableBoardUI } from "./interface";

export interface IInfoItems{
  isFirstTable?: boolean;
  infoItems?: { icon: JSX.Element; text: string }[];
}
export interface ITableBoardProps extends IInfoItems{
  id: string;
  entries: IEntries[];
  titles: ITitle[];
  actions?: IAction[];
  actionMobile?: IAction[];
  borderTable?: boolean;
  loading?: boolean;
  portalId?: string;
  appearanceTable?: IAppearances;
  nameTitleTag?: string;
}

export const TableBoard = (props: ITableBoardProps) => {
  const {
    id,
    entries,
    titles,
    actions,
    actionMobile,
    loading = false,
    borderTable = false,
    portalId,
    appearanceTable = {
      title: "primary",
      efectzebra: true,
      borderTable: false,
      background: false,
      isStyleMobile: true,
    },
    nameTitleTag,
    isFirstTable,
    infoItems, 
  } = props;

  const isTablet = useMediaQuery("(max-width: 720px)");

  return (
    <TableBoardUI
      id={id}
      actions={actions}
      entries={entries}
      actionMobile={actionMobile}
      borderTable={borderTable}
      loading={loading}
      portalId={portalId}
      titles={titles}
      appearanceTable={appearanceTable}
      isTablet={isTablet}
      nameTitleTag={nameTitleTag}
      isFirstTable={isFirstTable}
      infoItems={infoItems} 
    />
  );
};

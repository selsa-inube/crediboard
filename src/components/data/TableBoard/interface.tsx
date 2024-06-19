//import { useEffect, useRef, useState } from "react";
import { MdOutlineInfo } from "react-icons/md";
import { Icon, Text, SkeletonLine } from "@inube/design-system";

import { IAction, IEntries, ITitle, appearances } from "./types";
import {
  StyledContainer,
  StyledTable,
  StyledTbody,
  StyledThead,
  StyledTr,
  StyledTh,
  StyledTd,
  StyledThactions,
  StyledTdactions,
} from "./styles";
import { ITableBoardProps } from ".";

interface ITableBoardUIProps extends ITableBoardProps {
  titlesList: string[];
  loading: boolean;
  isTablet: boolean;
}

interface IRenderActionsTitles {
  actions: IAction[];
  isTablet: boolean;
  appearance: appearances;
}

const RenderActionsTitles = (props: IRenderActionsTitles) => {
  const { actions, appearance, isTablet } = props;
  return (
    <>
      {!isTablet ? (
        actions.map((actionTitle) => (
          <StyledThactions key={actionTitle.id}>
            <Text
              appearance={appearance}
              type="title"
              size="medium"
              padding="0px 4px"
              textAlign="center"
            >
              {actionTitle.actionName}
            </Text>
          </StyledThactions>
        ))
      ) : (
        <StyledThactions $isTablet={isTablet} colSpan={3} $isFirst>
          <Icon icon={<MdOutlineInfo />} appearance="primary" size="32px" />
        </StyledThactions>
      )}
    </>
  );
};

const actionsLoading = (numberActions: number) => {
  const cellsOfActionsLoading = [];
  for (let cellAction = 0; cellAction < numberActions; cellAction++) {
    cellsOfActionsLoading.push(
      <StyledTd key={cellAction}>
        <SkeletonLine animated />
      </StyledTd>
    );
  }
  return cellsOfActionsLoading;
};

const dataLoading = (titleColumns: ITitle[], numberActions: number) => {
  const rowsLoading = [];
  for (let rows = 0; rows < 3; rows++) {
    rowsLoading.push(
      <StyledTr key={rows}>
        {titleColumns.map((title) => (
          <StyledTd key={`e-${title.id}`}>
            <SkeletonLine animated />
          </StyledTd>
        ))}
        {actionsLoading(numberActions)}
      </StyledTr>
    );
  }
  return rowsLoading;
};

interface IActionsComponent {
  actions: IAction[];
  isTablet: boolean;
  entry: IEntries;
  actionMobile?: IAction[];
}

const Actions = (props: IActionsComponent) => {
  const { actions, isTablet, entry, actionMobile } = props;

  return (
    <>
      {!isTablet &&
        actions.map((action) => (
          <StyledTdactions key={action.id}>
            {action.content(entry)}
          </StyledTdactions>
        ))}
      {isTablet &&
        actionMobile &&
        actionMobile.map((action, index) => (
          <StyledTdactions
            key={action.id}
            $isTablet={isTablet}
            $isFirst={index === 0}
          >
            {action.content(entry)}
          </StyledTdactions>
        ))}
    </>
  );
};

export const TableBoardUI = (props: ITableBoardUIProps) => {
  const {
    id,
    entries,
    actions,
    titles,
    titlesList,
    borderTable,
    loading,
    appearanceTable,
    isTablet,
    actionMobile,
  } = props;

  /*  const widthActions = useRef<HTMLTableCellElement>(null);

  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (widthActions.current) {
      setWidth(widthActions.current.offsetWidth);
    }
  }, [isTablet]); */

  return (
    <StyledContainer id={id} $borderTable={borderTable!} $isTablet={isTablet}>
      <StyledTable
        $zebraEffect={appearanceTable!.efectzebra!}
        $background={appearanceTable!.background!}
        $isTablet={isTablet}
      >
        <StyledThead>
          <tr>
            {titles.map((title) => (
              <StyledTh key={title.id + id}>
                <Text
                  appearance={appearanceTable!.title}
                  type="title"
                  size="medium"
                  padding="0px 4px"
                >
                  {title.titleName}
                </Text>
              </StyledTh>
            ))}

            {actions && (
              <RenderActionsTitles
                actions={actions}
                appearance={appearanceTable!.title!}
                isTablet={isTablet}
              />
            )}
          </tr>
        </StyledThead>
        <StyledTbody>
          {loading ? (
            dataLoading(titles, actions?.length || 0)
          ) : (
            <>
              {entries.map((entry, index) => (
                <StyledTr
                  key={`${entry.id}-${index}`}
                  $borderTable={appearanceTable!.borderTable}
                >
                  {titlesList.map((title) => (
                    <StyledTd key={title} $widthTd={appearanceTable?.widthTd}>
                      {typeof entry[title] !== "string" &&
                      entry[title] !== undefined ? (
                        entry[title]
                      ) : (
                        <Text size="medium" padding="0px 4px">
                          {entry[title]}
                        </Text>
                      )}
                    </StyledTd>
                  ))}
                  {actions && (
                    <Actions
                      actions={actions}
                      isTablet={isTablet}
                      entry={entry}
                      actionMobile={actionMobile}
                    />
                  )}
                </StyledTr>
              ))}
            </>
          )}
        </StyledTbody>
      </StyledTable>
    </StyledContainer>
  );
};

/* 
actions.map((action, index) => (
  <StyledTdactions
    key={action.id}
    ref={widthActions}
    $isTablet={isTablet}
    $right={width * (actions.length - 1 - index)}
    
  >
    {action.content(entry)}
  </StyledTdactions>
)); */

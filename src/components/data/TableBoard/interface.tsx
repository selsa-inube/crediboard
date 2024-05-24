import { Text, SkeletonLine } from "@inube/design-system";

import { ITitle } from "./types";
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
}

const RenderActionsTitles = ({ actionName }: { actionName: string }) => {
  return (
    <StyledThactions>
      <Text
        appearance="primary"
        type="title"
        size="medium"
        padding="0px 4px"
        textAlign="center"
      >
        {actionName}
      </Text>
    </StyledThactions>
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

export const TableBoardUI = (props: ITableBoardUIProps) => {
  const { id, entries, actions, titles, titlesList, borderTable, loading } =
    props;

  return (
    <StyledContainer id={id} $borderTable={borderTable!}>
      <StyledTable>
        <StyledThead>
          <tr>
            {titles.map((title) => (
              <StyledTh key={title.id + id}>
                <Text
                  appearance="primary"
                  type="title"
                  size="medium"
                  padding="0px 4px"
                >
                  {title.titleName}
                </Text>
              </StyledTh>
            ))}

            {actions &&
              actions.map(
                (action) =>
                  action.actionName && (
                    <RenderActionsTitles
                      key={action.id}
                      actionName={action.actionName}
                    />
                  )
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
                  $zebraEffect={index % 2 === 0}
                >
                  {titlesList.map((title) => (
                    <StyledTd key={title}>
                      {typeof entry[title] !== "string" ? (
                        entry[title]
                      ) : (
                        <Text size="small" padding="0px 4px">
                          {entry[title]}
                        </Text>
                      )}
                    </StyledTd>
                  ))}
                  {actions &&
                    actions.map((action) => (
                      <StyledTdactions key={action.id}>
                        {action.content(entry)}
                      </StyledTdactions>
                    ))}
                </StyledTr>
              ))}
            </>
          )}
        </StyledTbody>
      </StyledTable>
    </StyledContainer>
  );
};

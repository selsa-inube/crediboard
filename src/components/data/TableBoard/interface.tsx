import { Text } from "@inube/design-system";

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
}

export const TableBoardUI = (props: ITableBoardUIProps) => {
  const { id, entries, actions, titles, titlesList, borderTable } = props;

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
          </tr>
          <tr>
            {actions &&
              actions.map(
                (action) =>
                  action.actionName && (
                    <StyledThactions key={action.id}>
                      <Text
                        appearance="primary"
                        type="title"
                        size="medium"
                        padding="0px 4px"
                      >
                        {action.actionName}
                      </Text>
                    </StyledThactions>
                  )
              )}
          </tr>
        </StyledThead>
        <StyledTbody>
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
        </StyledTbody>
      </StyledTable>
    </StyledContainer>
  );
};

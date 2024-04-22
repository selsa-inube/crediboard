import { Text } from "@inube/design-system";

import {
  StyledContainer,
  StyledTable,
  StyledTbody,
  StyledThead,
  StyledTr,
  StyledTh,
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
        </StyledThead>
        <StyledTbody>
          {entries.map((entry, index) => (
            <StyledTr
              key={`${entry.id}-${index}`}
              $zebraEffect={index % 2 === 0}
            >
              {titlesList.map((title) => (
                <td key={title}>
                  {typeof entry[title] !== "string" ? (
                    entry[title]
                  ) : (
                    <Text size="small" padding="0px 4px">
                      {entry[title]}
                    </Text>
                  )}
                </td>
              ))}
              {actions?.map((action) => (
                <td key={action.id}>{action.content(entry)}</td>
              ))}
            </StyledTr>
          ))}
        </StyledTbody>
      </StyledTable>
    </StyledContainer>
  );
};

import React from "react";
import { Text, Tag, Icon } from "@inube/design-system";

import { appearenceTag } from "./utils";
import { AppearenceTagObject, IEntriesTranform } from "./types";

import {
  StyledContainer,
  StyledTable,
  StyledTdTitle,
  StyledTdbodyContainer,
  StyledTbody,
  StyledTd,
  StyledThTitle,
  StyledThead,
} from "./styles";

import { ITableBoardProps } from ".";
import { MdAddCircleOutline } from "react-icons/md";

interface ITableBordUIprops extends ITableBoardProps {
  normalizedEntries: IEntriesTranform[];
}

const TitleTableBoard = (
  props: Pick<ITableBoardProps, "entries" | "colspan">
) => {
  const { entries, colspan } = props;

  const titles = entries.map((data) => ({
    id: data.section.title,
    titleName: data.section.title,
    priority: data.section.priority,
  }));

  return (
    <>
      {titles &&
        titles.map((title) => (
          <StyledThTitle key={title.id} colSpan={colspan!}>
            <Text appearance="primary" type="title" size="medium">
              {title.titleName}
            </Text>
          </StyledThTitle>
        ))}
    </>
  );
};

const EntriesSectionsTableBoard = (
  props: Pick<ITableBoardProps, "entries">
) => {
  const { entries } = props;

  return (
    <>
      {entries.map((entry) => (
        <React.Fragment key={entry.section.title}>
          <tr>
            <StyledTdTitle>
              <Text appearance="primary" type="title" size="medium">
                {entry.section.title}
              </Text>
            </StyledTdTitle>
          </tr>
          {entry.section.requirements.map((requirement, index) => (
            <StyledTdbodyContainer
              key={requirement.id}
              $zebraEffect={index % 2 === 0}
            >
              <td>
                <Text size="small">{requirement.description}</Text>
              </td>
              {requirement.tag && (
                <StyledTd>
                  <Tag
                    label={requirement.tag}
                    appearance={appearenceTag(requirement.tag)}
                  />
                </StyledTd>
              )}
            </StyledTdbodyContainer>
          ))}
        </React.Fragment>
      ))}
    </>
  );
};

const EntriesTableBoard = (
  props: Pick<ITableBordUIprops, "entries" | "normalizedEntries">
) => {
  const { entries, normalizedEntries } = props;

  return (
    <>
      {normalizedEntries.map((entry, index) => (
        <StyledTdbodyContainer key={entry.id} $zebraEffect={index % 2 === 0}>
          {entries.map((data) => (
            <React.Fragment key={data.section.title}>
              <td>
                <Text size="small">{entry[data.section.title]}</Text>
              </td>
              {entry[entry[data.section.title]] && (
                <StyledTd>
                  <Tag
                    label={entry[entry[data.section.title]]}
                    appearance={appearenceTag(
                      entry[
                        entry[data.section.title]
                      ] as keyof typeof AppearenceTagObject
                    )}
                  />
                </StyledTd>
              )}
            </React.Fragment>
          ))}
        </StyledTdbodyContainer>
      ))}
    </>
  );
};

/* const ActionsTableBoard = (props: Pick<ITableBoardProps, "actions">) => {
  const { actions } = props;

  return (
    <>
      {actions &&
        actions.map((action) => (
          <StyledTd key={action.id}>{action.content}</StyledTd>
        ))}
    </>
  );
};
 */
export const TableBoardUI = (props: ITableBordUIprops) => {
  const {
    id,
    entries,
    withTitles,
    colspan = "1",
    normalizedEntries,
    //actions,
  } = props;

  return (
    <StyledContainer id={id}>
      <StyledTable>
        {!withTitles && (
          <StyledThead>
            <tr>
              <TitleTableBoard entries={entries} colspan={colspan} />
            </tr>
          </StyledThead>
        )}
        <StyledTbody>
          {withTitles ? (
            <EntriesSectionsTableBoard entries={entries} />
          ) : (
            <EntriesTableBoard
              entries={entries}
              normalizedEntries={normalizedEntries}
            />
          )}
          <tr>
            <Icon icon={<MdAddCircleOutline />} appearance="primary" />
          </tr>
        </StyledTbody>
      </StyledTable>
    </StyledContainer>
  );
};

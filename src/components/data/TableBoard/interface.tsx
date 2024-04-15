import React from "react";
import { Text, Tag } from "@inube/design-system";

import {
  ITableBoardProps,
  AppearenceTagObject,
  IEntriesTranform,
} from "./types";

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

import { appearenceTag } from "./stories/utils";

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
                <Text type="body" size="small">
                  {requirement.description}
                </Text>
              </td>
              <StyledTd>
                <Tag
                  label={requirement.tag}
                  appearance={appearenceTag(requirement.tag)}
                />
              </StyledTd>
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
                <Text type="body" size="small">
                  {entry[data.section.title]}
                </Text>
              </td>
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
            </React.Fragment>
          ))}
        </StyledTdbodyContainer>
      ))}
    </>
  );
};

export const TableBoardUI = (props: ITableBordUIprops) => {
  const { id, entries, withTitles, colspan = "1", normalizedEntries } = props;

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
        </StyledTbody>
      </StyledTable>
    </StyledContainer>
  );
};

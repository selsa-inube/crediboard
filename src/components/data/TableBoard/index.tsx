import React from "react";

/* import {
  MdOutlineAddCircleOutline,
  MdCheckCircleOutline,
} from "react-icons/md"; */

import { Text, Tag } from "@inube/design-system";

import {
  StyledContainer,
  StyledTable,
  StyledTdTitle,
  StyledTdbodyContainer,
  StyledTbody,
  StyledTd,
  //StyledContainerData,
  StyledThTitle,
  StyledThead,
} from "./styles";

interface IRequirements {
  id: string;
  description: string;
  tag: "Cumple" | "No Cumple" | "Sin Evaluar";
}

interface ISection {
  title: string;
  requirements: IRequirements[];
  priority: number;
  validations: boolean;
}

export interface IEntries {
  section: ISection;
}

export interface ITableBoardProps {
  id: string;
  withTitles: boolean;
  entries: IEntries[];
}

interface IEntriesTranform {
  id: string;
  [key: string]: string;
}

const AppearenceTagObject = {
  Cumple: "success",
  "No Cumple": "error",
  "Sin Evaluar": "warning",
} as const;

function appearenceTag(requirementTag: keyof typeof AppearenceTagObject) {
  return AppearenceTagObject[requirementTag];
}

export const TitleTableBoard = (props: Pick<ITableBoardProps, "entries">) => {
  const { entries } = props;

  const titles = entries.map((data) => ({
    id: data.section.title,
    titleName: data.section.title,
    priority: data.section.priority,
  }));

  return (
    <>
      {titles &&
        titles.map((title) => (
          <StyledThTitle key={title.id}>
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

const transformData = (data: IEntries[]) => {
  const transformed: IEntriesTranform[] = [];

  data.forEach((item) => {
    const sectionTitle = item.section.title;
    const requirements = item.section.requirements;

    requirements.forEach((requirement, index) => {
      if (transformed.length <= index) {
        transformed.push({ id: `Section ${index + 1}` });
      }
      transformed[index][sectionTitle] = requirement.description;
    });
  });

  return transformed;
};

const EntriesTableBoard = (props: Pick<ITableBoardProps, "entries">) => {
  const { entries } = props;

  const dataEntries = transformData(entries);

  console.log("dataEntries", dataEntries);

  return (
    <>
      {dataEntries.map((entry, index) => (
        <StyledTdbodyContainer key={entry.id} $zebraEffect={index % 2 === 0}>
          {entries.map((data) => (
            <td key={data.section.title}>
              <Text type="body" size="small">
                {entry[data.section.title as keyof typeof entry]}
              </Text>
            </td>
          ))}
        </StyledTdbodyContainer>
      ))}
    </>
  );
};

export const TableBoard = (props: ITableBoardProps) => {
  const { id, entries, withTitles } = props;

  return (
    <StyledContainer id={id}>
      <StyledTable>
        {!withTitles && (
          <StyledThead>
            <tr>
              <TitleTableBoard entries={entries} />
            </tr>
          </StyledThead>
        )}
        <StyledTbody>
          {withTitles ? (
            <EntriesSectionsTableBoard entries={entries} />
          ) : (
            <EntriesTableBoard entries={entries} />
          )}
        </StyledTbody>
      </StyledTable>
    </StyledContainer>
  );
};

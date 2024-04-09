import React from "react";

import {
  MdOutlineAddCircleOutline,
  MdCheckCircleOutline,
} from "react-icons/md";
import { Icon, Text, Tag } from "@inube/design-system";

import {
  StyledContainer,
  StyledTable,
  StyledTdTitle,
  StyledTdbodyContainer,
  StyledTbody,
  StyledTd,
  StyledContainerData,
} from "./styles";

interface IRequirements {
  id: string;
  description: string;
  tag: "Cumple" | "No Cumple" | "Sin Evaluar";
}

interface ISection {
  title: string;
  requirements: IRequirements[];
  validations: boolean;
}

export interface IEntries {
  section: ISection;
}

export interface ITableBoardProps {
  id: string;
  entries: IEntries[];
}

const AppearenceTagObject = {
  Cumple: "success",
  "No Cumple": "error",
  "Sin Evaluar": "warning",
} as const;

function appearenceTag(requirementTag: keyof typeof AppearenceTagObject) {
  return AppearenceTagObject[requirementTag];
}

export const TableBoard = (props: ITableBoardProps) => {
  const { id, entries } = props;
  return (
    <StyledContainer id={id}>
      <StyledTable>
        <StyledTbody>
          {entries.map((entry) => (
            <React.Fragment key={entry.section.title}>
              <tr>
                <StyledTdTitle colSpan={2}>
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
                    <StyledContainerData>
                      <Icon
                        icon={<MdOutlineAddCircleOutline />}
                        appearance="primary"
                        cursorHover
                      />
                      <Icon
                        icon={<MdCheckCircleOutline />}
                        appearance="primary"
                        cursorHover
                      />
                    </StyledContainerData>
                  </StyledTd>
                </StyledTdbodyContainer>
              ))}
            </React.Fragment>
          ))}
        </StyledTbody>
      </StyledTable>
    </StyledContainer>
  );
};

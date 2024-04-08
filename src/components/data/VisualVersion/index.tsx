import { Text } from "@inube/design-system";

import {
  StyledContainer,
  StyledTable,
  StyledTr,
  StyledTdTitle,
  StyledTdbody,
  StyledTdbodyContainer,
  StyledTbody,
} from "./styles";

interface IRequirements {
  id: string;
  description: string;
  tag: string;
}

interface ISection {
  title: string;
  requirements: IRequirements[];
  validations: boolean;
}

export interface IEntries {
  section: ISection;
}

export interface IVisualVersionProps {
  id: string;
  entries: IEntries[];
}

export const VisualVersion = (props: IVisualVersionProps) => {
  const { id, entries } = props;

  return (
    <StyledContainer id={id}>
      <StyledTable>
        <StyledTbody>
          {entries.map((entry) => (
            <StyledTr key={entry.section.title}>
              <StyledTdTitle>
                <Text appearance="primary" type="title" size="medium">
                  {entry.section.title}
                </Text>
              </StyledTdTitle>
              <StyledTdbody>
                {entry.section.requirements.map((requirement, index) => (
                  <StyledTdbodyContainer
                    key={requirement.id}
                    zebraEffect={index % 2 === 0}
                  >
                    <StyledTdbody>
                      <Text key={requirement.id} type="body" size="small">
                        {requirement.description}
                      </Text>
                    </StyledTdbody>
                  </StyledTdbodyContainer>
                ))}
              </StyledTdbody>
            </StyledTr>
          ))}
        </StyledTbody>
      </StyledTable>
    </StyledContainer>
  );
};

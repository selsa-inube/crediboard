import {
  MdOutlineAddCircleOutline,
  MdCheckCircleOutline,
} from "react-icons/md";
import { Icon, Text, Tag } from "@inube/design-system";

import {
  StyledContainer,
  StyledTable,
  StyledTr,
  StyledTdTitle,
  StyledTdbody,
  StyledTdbodyContainer,
  StyledTbody,
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

export interface IVisualVersionProps {
  id: string;
  entries: IEntries[];
}

const AppearenceTagObject = {
  Cumple: "success",
  "No Cumple": "error",
  "Sin Evaluar": "warning",
} as const;

function appearenceTag(requirementTag: keyof typeof AppearenceTagObject) {
  console.log(requirementTag, "entro");

  return AppearenceTagObject[requirementTag];
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
                    $zebraEffect={index % 2 === 0}
                  >
                    <StyledTdbody>
                      <StyledContainerData>
                        <Text key={requirement.id} type="body" size="small">
                          {requirement.description}
                        </Text>
                        <Tag
                          label={requirement.tag}
                          appearance={appearenceTag(requirement.tag)}
                        />
                        <StyledContainerData>
                          <Icon
                            icon={<MdOutlineAddCircleOutline />}
                            appearance="primary"
                          />
                          <Icon
                            icon={<MdCheckCircleOutline />}
                            appearance="primary"
                          />
                        </StyledContainerData>
                      </StyledContainerData>
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

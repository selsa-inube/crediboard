import { useState } from "react";
import { MdOutlineChevronRight } from "react-icons/md";
import { Icon, Stack, Text } from "@inube/design-system";

import { StyledDetails, StyledSummary, StyledCollapseIcon } from "./styles";

export interface IAccordionProps {
  name: string;
  title: React.ReactNode;
  content?: React.ReactNode;
}

export const Accordion = (props: IAccordionProps) => {
  const { name, title, content } = props;

  const [collapse, setCollapse] = useState(false);

  return (
    <Stack width="100%">
      <StyledDetails name={name}>
        <StyledSummary onClick={() => setCollapse(!collapse)}>
          <StyledCollapseIcon
            onClick={() => setCollapse(!collapse)}
            $collapse={collapse}
          >
            <Icon
              icon={<MdOutlineChevronRight />}
              appearance="dark"
              size="24px"
              cursorHover
              onClick={() => setCollapse(!collapse)}
            />
          </StyledCollapseIcon>
          {typeof title === "string" || typeof title === "number" ? (
            <Text>{title}</Text>
          ) : (
            title
          )}
        </StyledSummary>
        {typeof content === "string" || typeof content === "number" ? (
          <Text>{content}</Text>
        ) : (
          content
        )}
      </StyledDetails>
    </Stack>
  );
};

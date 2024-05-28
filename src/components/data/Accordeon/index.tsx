import { useState } from "react";
import { MdOutlineChevronRight } from "react-icons/md";
import { Stack, Icon } from "@inube/design-system";

import { StyledDetails, StyledSummary, StyledCollapseIcon } from "./styles";

export interface IAccordionProps {
  name: string;
  title: React.ReactNode;
  component?: JSX.Element;
}

export const Accordeon = (props: IAccordionProps) => {
  const { name, title, component } = props;

  const [collapse, setCollapse] = useState(false);

  return (
    <Stack width="100%">
      <StyledDetails name={name} onClick={() => setCollapse(!collapse)}>
        <StyledSummary>
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
          {title}
        </StyledSummary>
        {component}
      </StyledDetails>
    </Stack>
  );
};

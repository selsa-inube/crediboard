import styled from "styled-components";
import { inube } from "@inube/design-system";

import { SectionBackground } from "./types";

interface IStyledBoardSection {
  theme?: typeof inube;
  sectionBackground?: SectionBackground;
}

const StyledBoardSection = styled.div<IStyledBoardSection>`
  display: flex;
  flex-direction: column;
  gap: ${inube.spacing.s150};
  padding: ${inube.spacing.s400} ${inube.spacing.s150};
  width: 261px;
  height: 1500px;
  background-color: ${({ theme, sectionBackground }) =>
    sectionBackground === "gray"
      ? theme?.color?.surface?.gray?.regular || inube.color.surface.gray.regular
      : theme?.color?.surface?.light?.regular ||
        inube.color.surface.light.regular};
`;

const StyledDivider = styled.hr`
  margin: ${inube.spacing.s0};
  width: 285px;
  border: none;
  border-top: 1px solid;
  border-top-color: ${({ theme }: IStyledBoardSection) =>
    theme?.color?.stroke?.divider?.dark || inube.color.stroke.divider.dark};
`;

export { StyledBoardSection, StyledDivider };

import styled from "styled-components";
import { inube } from "@inube/design-system";

import { SectionBackground, SectionOrientation } from "./types";

interface IStyledBoardSection {
  theme?: typeof inube;
  $sectionBackground?: SectionBackground;
  $orientation?: SectionOrientation;
}

interface IStyledCollapseIcon {
  $collapse: boolean;
}

const StyledBoardSection = styled.div<IStyledBoardSection>`
  display: flex;
  flex-direction: column;
  gap: ${inube.spacing.s150};
  padding: ${inube.spacing.s300} ${inube.spacing.s150} ${inube.spacing.s150};
  width: ${({ $orientation }) =>
    $orientation === "horizontal" ? "calc(100% - 24px)" : "261px"};
  min-width: 261px;
  height: ${({ $orientation }) =>
    $orientation === "horizontal" ? "100%" : "1500px"};
  border-top: 1px solid;
  border-top-color: ${({ theme }: IStyledBoardSection) =>
    theme?.color?.stroke?.divider?.dark || inube.color.stroke.divider.dark};
  background-color: ${({ theme, $sectionBackground }) =>
    $sectionBackground === "gray"
      ? theme?.color?.surface?.gray?.regular || inube.color.surface.gray.regular
      : theme?.color?.surface?.light?.regular ||
        inube.color.surface.light.regular};
`;

const StyledCollapseIcon = styled.div<IStyledCollapseIcon>`
  display: flex;
  transition: all 500ms ease;
  transform: ${({ $collapse }) =>
    $collapse ? "rotate(90deg)" : "rotate(0deg)"};
`;

export { StyledBoardSection, StyledCollapseIcon };

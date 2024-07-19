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
  $disabledCollapse: boolean;
}

const StyledBoardSection = styled.div<IStyledBoardSection>`
  display: flex;
  flex-direction: column;
  gap: ${inube.spacing.s150};
  padding: ${inube.spacing.s300} ${inube.spacing.s150} ${inube.spacing.s150};
  width: calc(100% - 24px);
  border-top: 1px solid;
  border-bottom: ${({ $orientation }) =>
    $orientation !== "horizontal" ? "1px solid" : "none"};
  border-color: ${({ theme }: IStyledBoardSection) =>
    theme?.color?.stroke?.divider?.dark || inube.color.stroke.divider.dark};
  background-color: ${({ theme, $sectionBackground }) =>
    $sectionBackground === "gray"
      ? theme?.color?.surface?.gray?.regular || inube.color.surface.gray.regular
      : theme?.color?.surface?.light?.regular ||
        inube.color.surface.light.regular};

  @media screen and (max-width: 1024px) {
    & > div:nth-child(1) {
      justify-content: space-between;
      margin-right: 20px;
    }
  }
`;

const StyledCollapseIcon = styled.div<IStyledCollapseIcon>`
  display: flex;
  transition: all 500ms ease;
  transform: ${({ $collapse }) =>
    $collapse ? "rotate(90deg)" : "rotate(0deg)"};
  cursor: ${({ $disabledCollapse }) =>
    $disabledCollapse ? "not-allowed" : "pointer"};
`;

export { StyledBoardSection, StyledCollapseIcon };

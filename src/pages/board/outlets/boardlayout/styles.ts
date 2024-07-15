import styled from "styled-components";
import { inube } from "@inube/design-system";

import { SectionOrientation } from "@components/layout/BoardSection/types";

interface IStyledBoardContainer {
  $orientation: SectionOrientation;
  $isMobile: boolean;
}

interface IStyledInputsContainer {
  theme?: typeof inube;
  $isMobile: boolean;
}

const StyledInputsContainer = styled.div<IStyledInputsContainer>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${({ $isMobile, theme }) =>
    $isMobile
      ? theme?.spacing?.s150 || inube.spacing.s150
      : theme?.spacing?.s400 || inube.spacing.s400};
  padding-right: ${({ $isMobile, theme }) =>
    $isMobile
      ? theme?.spacing?.s200 || inube.spacing.s200
      : theme?.spacing?.s500 || inube.spacing.s500};
  padding-bottom: ${({ theme }) => theme?.spacing?.s200 || inube.spacing.s200};
  padding-left: ${({ $isMobile, theme }) =>
    $isMobile
      ? theme?.spacing?.s200 || inube.spacing.s200
      : theme?.spacing?.s500 || inube.spacing.s500};
  gap: ${inube.spacing.s500};
  box-shadow: ${({ $isMobile }) => !$isMobile && "0px 1px 3px 0px #00000040"};
`;

const StyledBoardContainer = styled.div<IStyledBoardContainer>`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: ${({ $orientation }) =>
    $orientation === "horizontal" ? "column" : "row"};
  padding-top: ${({ $isMobile, theme }) =>
    $isMobile
      ? theme?.spacing?.s0 || inube.spacing.s0
      : theme?.spacing?.s400 || inube.spacing.s400};
  padding-right: ${({ $isMobile, theme }) =>
    $isMobile
      ? theme?.spacing?.s200 || inube.spacing.s200
      : theme?.spacing?.s500 || inube.spacing.s500};
  padding-bottom: ${({ theme }) => theme?.spacing?.s200 || inube.spacing.s200};
  padding-left: ${({ $isMobile, theme }) =>
    $isMobile
      ? theme?.spacing?.s200 || inube.spacing.s200
      : theme?.spacing?.s500 || inube.spacing.s500};
  overflow: auto;
`;

export { StyledInputsContainer, StyledBoardContainer };

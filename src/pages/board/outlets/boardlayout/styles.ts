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

interface IStyledSearch {
  $isMobile: boolean;
  $isExpanded: boolean;
}

const StyledInputsContainer = styled.div<IStyledInputsContainer>`
  display: ${({ $isMobile }) => ($isMobile ? "block" : "flex")};
  flex-direction: column;
  align-items: center;
  padding-top: ${({ $isMobile, theme }) =>
    $isMobile
      ? theme?.spacing?.s0 || inube.spacing.s0
      : theme?.spacing?.s400 || inube.spacing.s400};
  padding-right: ${({ $isMobile, theme }) =>
    $isMobile
      ? theme?.spacing?.s200 || inube.spacing.s200
      : theme?.spacing?.s150 || inube.spacing.s150};
  padding-bottom: ${({ $isMobile, theme }) =>
    $isMobile
      ? theme?.spacing?.s0 || inube.spacing.s0
      : theme?.spacing?.s200 || inube.spacing.s200};
  padding-left: ${({ $isMobile, theme }) =>
    $isMobile
      ? theme?.spacing?.s200 || inube.spacing.s200
      : theme?.spacing?.s150 || inube.spacing.s150};
  gap: ${inube.spacing.s500};
  box-shadow: ${({ $isMobile }) => !$isMobile && "0px 6px 3px -5px #00000040"};
`;

const getWidth = ($isMobile: boolean, $isExpanded: boolean) => {
  if ($isMobile) {
    return $isExpanded ? "480px" : "50px";
  }
  return "480px";
};

const StyledSearch = styled.div<IStyledSearch>`
  cursor: pointer;
  width: ${({ $isMobile, $isExpanded }) => getWidth($isMobile, $isExpanded)};

  & > div > div > div{
    padding-left: ${({ $isMobile }) => ($isMobile ? "9px" : "16px")};
  }
`;

const StyledBoardContainer = styled.div<IStyledBoardContainer>`
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
      : theme?.spacing?.s100 || inube.spacing.s100};
  padding-bottom: ${({ theme }) => theme?.spacing?.s200 || inube.spacing.s200};
  padding-left: ${({ $isMobile, theme }) =>
    $isMobile
      ? theme?.spacing?.s200 || inube.spacing.s200
      : theme?.spacing?.s100 || inube.spacing.s100};
  overflow: auto;
`;

export const StyledContainerToCenter = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1440px;
  width: 100%;
  align-items: center;
`;

export { StyledInputsContainer, StyledBoardContainer, StyledSearch };

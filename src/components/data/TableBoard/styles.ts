import styled from "styled-components";
import { inube } from "@inube/design-system";

interface IStyledContainer {
  $borderTable: boolean;
  $isTablet: boolean;
  $actionsMobile: boolean;
}

export const StyledContainer = styled.div<IStyledContainer>`
  border-radius: 8px;
  max-width: 100%;
  position: relative;
  box-shadow: ${({ $isTablet, $actionsMobile }) =>
    $isTablet && $actionsMobile && "1px 1px 3px 1px #DFE1E6"};
  overflow-x: ${({ $isTablet }) => ($isTablet ? "auto" : "hidden")};
  padding-top: ${({ theme, $isTablet }) =>
    $isTablet
      ? theme?.spacing?.s075 || inube.spacing.s075
      : theme?.spacing?.s075 || inube.spacing.s075};
  padding-bottom: ${({ theme, $isTablet }) =>
    $isTablet
      ? theme?.spacing?.s075 || inube.spacing.s075
      : theme?.spacing?.s075 || inube.spacing.s075};
  padding-left: ${({ theme }) => theme?.spacing?.s075 || inube.spacing.s075};
  padding-right: ${({ theme, $isTablet }) =>
    ($isTablet ? "0px" : theme?.spacing?.s075) || inube.spacing.s075};
  border: ${({ theme, $borderTable }) =>
    $borderTable &&
    `2px solid ${theme?.color?.stroke?.divider?.regular || inube.color.stroke.divider.regular}`};
  overflow: visible;
`;

interface IStyledThactions {
  $isTablet?: boolean;
  $isFirst?: boolean;
}
export const StyledThactions = styled.th<IStyledThactions>`
  ${({ $isTablet, $isFirst, theme }) =>
    $isTablet &&
    `position: sticky; z-index: 22; background-color: white; text-align: end; ${
      $isFirst &&
      `&::before { content: ""; position: absolute; top: 0; left: -2px; width: 2px; height: 100%;  box-shadow: 0px 1px 3px 1px #DFE1E6; background-color: ${theme?.color?.stroke?.gray?.regular || inube.color.stroke.gray.regular}; }`
    }`}
`;

interface IStyledTdactions {
  $right?: number;
  $isTablet?: boolean;
  $isFirst?: boolean;
}

export const StyledTdactions = styled.td<IStyledTdactions>`
  text-align: center;
  ${({ $isTablet, $isFirst, theme }) =>
    $isTablet &&
    `position: sticky; z-index: 22; ${
      $isFirst &&
      `&::before { content: ""; position: absolute; top: 0; left: -2px; width: 2px; height: 100%; box-shadow: 0px 1px 3px 1px #DFE1E6; background-color: ${theme?.color?.stroke?.gray?.regular || inube.color.stroke.gray.regular}; }`
    }`}
`;

interface IStyledTable {
  $zebraEffect: boolean;
  $background: boolean;
  $isTablet: boolean;
}

export const StyledTable = styled.table<IStyledTable>`
  border-collapse: collapse;
  width: 100%;
  box-sizing: border-box;

  tbody tr {
    background-color: ${({ theme, $background }) =>
      $background
        ? theme?.color?.surface?.gray?.regular ||
          inube.color.surface.gray.regular
        : theme?.color?.surface?.gray?.clear || inube.color.surface.gray.clear};
  }

  thead th {
    background-color: ${({ theme }) =>
      theme?.color?.surface?.gray?.clear || inube.color.surface.gray.clear};
  }

  ${({ $zebraEffect, theme, $background }) =>
    $zebraEffect &&
    !$background &&
    `tbody tr:nth-child(even) {background-color: ${theme?.color?.surface?.gray?.clear || inube.color.surface.gray.clear};}; tbody tr:nth-child(odd) {background-color: ${theme?.color?.surface?.gray?.regular || inube.color.surface.gray.regular};}`}

  ${({ $isTablet, theme }) =>
    $isTablet &&
    `tbody tr {
      &:nth-child(even) ${StyledTdactions} {
        background-color: ${theme?.color?.surface?.gray?.clear || inube.color.surface.gray.clear};
      }
      &:nth-child(odd) ${StyledTdactions} {
        background-color: ${theme?.color?.surface?.gray?.regular || inube.color.surface.gray.regular};
      }
      
    }`}
`;

export const StyledTbody = styled.tbody`
  background-color: ${({ theme }) =>
    theme?.color?.surface?.light?.clear || inube.color.surface.light.clear};
`;

export const StyledThead = styled.thead`
  background-color: ${({ theme }) =>
    theme?.color?.surface?.light?.clear || inube.color.surface.light.clear};
`;

export const StyledTh = styled.th`
  background-color: ${({ theme }) =>
    theme?.color?.surface?.gray?.clear || inube.color.surface.gray.clear};
`;

interface IStyledTdbodyContainer {
  $borderTable?: boolean;
}

export const StyledTr = styled.tr<IStyledTdbodyContainer>`
  vertical-align: middle;
  white-space: normal;
  box-sizing: border-box;
  border-bottom: ${({ theme, $borderTable }) =>
    $borderTable &&
    `1px solid ${theme?.color?.stroke?.divider?.regular || inube.color.stroke.divider.regular}`};
`;

interface IStyledTd {
  $widthTd?: string;
}

export const StyledTd = styled.td<IStyledTd>`
  width: ${({ $widthTd }) => $widthTd};
  height: 24px;
`;

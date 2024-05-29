import styled from "styled-components";

import { inube } from "@inube/design-system";

interface IStyledContainer {
  $borderTable: boolean;
}

interface IStyledTdbodyContainer {
  $zebraEffect?: boolean;
  $borderTable?: boolean;
  $background?: boolean;
}

export const StyledContainer = styled.div<IStyledContainer>`
  border-radius: 8px;
  overflow: hidden;
  padding-top: ${({ theme }) => theme?.spacing?.s150 || inube.spacing.s150};
  padding-bottom: ${({ theme }) => theme?.spacing?.s150 || inube.spacing.s150};
  padding-left: ${({ theme }) => theme?.spacing?.s075 || inube.spacing.s075};
  padding-right: ${({ theme }) => theme?.spacing?.s075 || inube.spacing.s075};
  border: ${({ theme, $borderTable }) =>
    $borderTable &&
    `2px solid ${theme?.color?.stroke?.divider?.regular || inube.color.stroke.divider.regular}`};
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
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

export const StyledThactions = styled.th`
  text-align: center;
  min-width: 100px;
`;

export const StyledTdactions = styled.td`
  text-align: -webkit-center;
`;

export const StyledTr = styled.tr<IStyledTdbodyContainer>`
  vertical-align: middle;
  white-space: nowrap;
  background-color: ${({ theme, $zebraEffect }) =>
    $zebraEffect
      ? theme?.color?.surface?.gray?.regular || inube.color.surface.gray.regular
      : theme?.color?.surface?.gray?.clear || inube.color.surface.gray.clear};
  border-bottom: ${({ theme, $borderTable }) =>
    $borderTable &&
    `1px solid ${theme?.color?.stroke?.divider?.regular || inube.color.stroke.divider.regular}`};

  &:first-child {
    border-top: ${({ theme, $borderTable }) =>
      $borderTable &&
      `1px solid ${theme?.color?.stroke?.divider?.regular || inube.color.stroke.divider.regular}`};
  }
`;

export const StyledTd = styled.td`
  width: 310px;
  height: 24px;
`;

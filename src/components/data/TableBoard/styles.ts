import styled from "styled-components";

import { inube } from "@inube/design-system";

interface IStyledTdbodyContainer {
  $zebraEffect: boolean;
}

interface IStyledThTitle {
  colSpan: string;
}

export const StyledContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  padding-top: ${({ theme }) => theme?.spacing?.s150 || inube.spacing.s150};
  padding-left: ${({ theme }) => theme?.spacing?.s075 || inube.spacing.s075};
  padding-right: ${({ theme }) => theme?.spacing?.s075 || inube.spacing.s075};
  border: 1px solid
    ${({ theme }) =>
      theme?.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
`;

export const StyledTable = styled.table`
  box-sizing: border-box;
  border-collapse: collapse;
  table-layout: auto;
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

export const StyledTdTitle = styled.td`
  text-align: center;
`;

export const StyledThTitle = styled.th<IStyledThTitle>`
  background-color: ${({ theme }) =>
    theme?.color?.surface?.gray?.clear || inube.color.surface.gray.clear};
`;

export const StyledTdbodyContainer = styled.tr<IStyledTdbodyContainer>`
  background-color: ${({ theme, $zebraEffect }) =>
    $zebraEffect
      ? theme?.color?.surface?.gray?.regular || inube.color.surface.gray.regular
      : theme?.color?.surface?.gray?.clear || inube.color.surface.gray.clear};
`;

export const StyledTd = styled.td`
  display: flex;
  justify-content: space-between;
`;

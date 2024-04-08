import styled from "styled-components";

import { inube } from "@inube/design-system";

interface IStyledTdbody {
  zebraEffect: boolean;
}

export const StyledContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  padding-top: ${inube.spacing.s150};
  padding-left: ${inube.spacing.s075};
  padding-right: ${inube.spacing.s075};
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

export const StyledTr = styled.tr`
  display: flex;
  flex-direction: column;
`;

export const StyledTdTitle = styled.td`
  padding: ${inube.spacing.s0} ${inube.spacing.s200};
  text-align: center;
`;

export const StyledTdbody = styled.td`
  text-align: center;
`;

export const StyledTdbodyContainer = styled.div<IStyledTdbody>`
  padding: ${inube.spacing.s025} ${inube.spacing.s200};
  background-color: ${({ zebraEffect }) =>
    zebraEffect
      ? inube.color.surface.gray.regular
      : inube.color.surface.gray.clear};
`;

/*  &:last-child {
    border-bottom: ${({ $entriesLength, $pageLength }) =>
      $entriesLength < $pageLength && "none"};
  } */

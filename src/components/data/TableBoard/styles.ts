import styled from "styled-components";

import { inube } from "@inube/design-system";

interface IStyledTdbodyContainer {
  $zebraEffect: boolean;
}

export const StyledContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  padding-top: ${inube.spacing.s150};
  padding-left: ${inube.spacing.s075};
  padding-right: ${inube.spacing.s075};
  border: 1px solid ${inube.color.stroke.divider.regular};
`;

export const StyledTable = styled.table`
  box-sizing: border-box;
  border-collapse: collapse;
  table-layout: auto;
  width: 100%;
`;

export const StyledTbody = styled.tbody`
  background-color: ${inube.color.surface.light.clear};
`;

export const StyledTdTitle = styled.td`
  text-align: center;
`;

export const StyledTdbodyContainer = styled.tr<IStyledTdbodyContainer>`
  background-color: ${({ $zebraEffect }) =>
    $zebraEffect
      ? inube.color.surface.gray.regular
      : inube.color.surface.gray.clear};
`;

export const StyledTd = styled.td`
  display: flex;
  justify-content: space-between;
`;

export const StyledContainerData = styled.div`
  display: flex;
  flex-direction: row;
`;

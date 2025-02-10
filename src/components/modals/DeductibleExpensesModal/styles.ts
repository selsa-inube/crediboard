import styled from "styled-components";
import { inube } from "@inubekit/foundations";

export const StyledContainerClose = styled.div`
  cursor: pointer;
`;

export const StyledContainer = styled.div`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0}; 
  border-radius: 8px;
`;

export const ScrollableContainer = styled.div`
  height: 132px;
  overflow: auto;
  border: 1px solid
    ${({ theme }) =>
    theme?.palette?.neutral?.N100 || "rgba(223, 225, 230, 1)"}; 
  border-radius: 8px;
  padding: 8px 8px 0 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 8px;
    background: ${({ theme }) =>
    theme?.palette?.neutral?.N100 || "rgba(235, 236, 240, 1)"}; 
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N50 || inube.palette.neutral.N50};
    border-radius: 8px;
  }
`;

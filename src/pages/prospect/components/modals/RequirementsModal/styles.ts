import styled from "styled-components";
import { inube } from "@inubekit/foundations";

export const StyledContainerClose = styled.div`
  cursor: pointer;
`;

export const StyledContainer = styled.div`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  border-radius: 8px;
  overflow: hidden;
`;

export const ScrollableContainer = styled.div`
  height: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
      theme?.palette?.neutral?.N50 || inube.palette.neutral.N50};
    border-radius: 8px;
  }
`;

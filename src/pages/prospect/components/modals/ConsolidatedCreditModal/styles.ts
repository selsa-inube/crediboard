import styled from "styled-components";
import { inube } from "@inubekit/foundations";

interface IStyledModal {
  $isMobile?: boolean;
}

export const StyledModal = styled.div<IStyledModal>`
  display: flex;
  flex-direction: column;
  height: ${({ $isMobile }) => ($isMobile ? "auto" : "644px")};
  width: ${({ $isMobile }) => ($isMobile ? "311px" : "644px")};
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  padding: 24px;
  gap: 24px;
  border-radius: 8px;
`;

export const StyledContainerClose = styled.div`
  cursor: pointer;
  display: flex;
  
`;

export const ScrollableContainer = styled.div`
  height: 2000%;
  overflow: auto;

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

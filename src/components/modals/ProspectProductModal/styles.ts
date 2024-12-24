import styled from "styled-components";
import { inube } from "@inubekit/foundations";

interface IStyledModal {
  $smallScreen: boolean;
}

const StyledModal = styled.div<IStyledModal>`
  display: flex;
  width: ${({ $smallScreen }) => ($smallScreen ? "100%" : "450px")};
  padding: ${({ $smallScreen }) => ($smallScreen ? "16px" : "24px")};
  height: ${({ $smallScreen }) => ($smallScreen ? "452px" : "765px")};
  margin: 24px;
  flex-direction: column;
  gap: ${({ $smallScreen }) => ($smallScreen ? "16px" : "20px")};
  align-items: flex-end;
  border-radius: 16px;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
`;

const ScrollableContainer = styled.div`
  width: 440px;
  padding: 10px;
  overflow: auto;
  display: flex;

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

const StyledContainerClose = styled.div`
  cursor: pointer;
`;

export { StyledModal, StyledContainerClose, ScrollableContainer };

import styled from "styled-components";
import { inube } from "@inubekit/foundations";

interface IStyledModal {
  $smallScreen: boolean;
}

const StyledModal = styled.div<IStyledModal>`
  display: flex;
  width: ${({ $smallScreen }) => ($smallScreen ? "100%" : "450px")};
  padding: ${({ $smallScreen }) => ($smallScreen ? "16px" : "24px")};
  margin: 24px;
  flex-direction: column;
  gap: ${({ $smallScreen }) => ($smallScreen ? "16px" : "20px")};
  align-items: flex-end;
  border-radius: 16px;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
`;

const StyledContainerClose = styled.div`
  cursor: pointer;
`;


export { StyledModal, StyledContainerClose};

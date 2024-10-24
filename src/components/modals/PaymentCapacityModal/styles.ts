import styled from "styled-components";
import { inube } from "@inubekit/foundations";

interface IStyledModal {
  $smallScreen: boolean;
}

export const StyledModal = styled.div<IStyledModal>`
  display: flex;
  flex-direction: column;
  max-height: ${({ $smallScreen }) => ($smallScreen ? "700px" : "563px")};
  width: ${({ $smallScreen }) => ($smallScreen ? "280px" : "451px")};
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


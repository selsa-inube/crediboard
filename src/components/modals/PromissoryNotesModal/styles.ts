import styled from "styled-components";
import { inube } from "@inubekit/foundations";

interface IStyledModal {
  $smallScreen: boolean;
}

const StyledModal = styled.div<IStyledModal>`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.palette.neutral.N0};
  width: ${({ $smallScreen }) => ($smallScreen ? "280px" : "443px")};
  height: ${({ $smallScreen }) => ($smallScreen ? "452px" : "420px")};
  padding: ${({ $smallScreen }) => ($smallScreen ? "16px" : "32px")};
  gap: ${({ $smallScreen }) => ($smallScreen ? "16px" : "24px")};
  border-radius: ${"8px"};
`;

export const StyledContainerClose = styled.div`
  display: flex;
  cursor: pointer;
`;

export const StyledContainerTitle = styled.div`
  display: flex;
  margin: 0px;
  padding: 0px;
  justify-content: space-between;
`;

export { StyledModal };

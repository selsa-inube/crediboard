import styled from "styled-components";
import { inube } from "@inubekit/foundations";

interface IStyledModal {
  $isMobile: boolean;
  theme?: typeof inube;
}

export const StyledModal = styled.div<IStyledModal>`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.palette.neutral.N0};
  width: ${({ $isMobile }) => ($isMobile ? "280px" : "500px")};
  padding: ${({ $isMobile }) => ($isMobile ? "16px" : "24px")};
  gap: ${({ $isMobile }) => ($isMobile ? "16px" : "24px")};
  border-radius: ${"8px"};
`;

export const StyledContainerClose = styled.div`
  cursor: pointer;
`;



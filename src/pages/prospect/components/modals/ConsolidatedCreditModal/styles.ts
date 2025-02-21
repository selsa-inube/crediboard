import styled from "styled-components";
import { inube } from "@inubekit/foundations";

interface IStyledModal {
  $isMobile?: boolean;
}

export const StyledModal = styled.div<IStyledModal>`
  display: flex;
  flex-direction: column;
  height: ${({ $isMobile }) => ($isMobile ? "auto" : "640px")};
  width: ${({ $isMobile }) => ($isMobile ? "388px" : "644px")};
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

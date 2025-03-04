import styled from "styled-components";
import { inube } from "@inubekit/foundations";

interface IScrollableContainer {
  $isMobile: boolean;
}

export const ScrollableContainer = styled.div<IScrollableContainer>`
  height: ${({ $isMobile }) => ($isMobile ? "auto" : "469px")};
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

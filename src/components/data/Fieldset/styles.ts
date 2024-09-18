import styled from "styled-components";
import { inube } from "@inubekit/foundations";

interface IStyledContainerFieldset {
  $aspectRatio?: string;
  $isMobile: boolean;
  $hasTable: boolean;
  $hasOverflow?: boolean;
}

export const StyledContainerFieldset = styled.div<IStyledContainerFieldset>`
  overflow-y: ${({ $hasOverflow }) => ($hasOverflow ? "visible" : "auto")};
  overflow-x: hidden;
  border-radius: 8px;
  border-width: 2px;
  border-style: solid;
  aspect-ratio: ${({ $aspectRatio, $isMobile }) => !$isMobile && $aspectRatio};
  border-color: ${({ theme }) =>
    theme?.palette?.neutral?.N200 || inube.palette.neutral.N200};
  box-shadow: 0px 2px 6px
    ${({ theme }) => theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
  padding-top: ${({ $hasTable }) => !$hasTable && "16px"};
  padding-bottom: ${({ $hasTable }) => !$hasTable && "16px"};
  padding-right: ${({ $hasTable }) => !$hasTable && "8px"};
  padding-left: ${({ $hasTable }) => !$hasTable && "8px"};

  ${({ $isMobile, theme }) =>
    !$isMobile &&
    `
    &::-webkit-scrollbar {
      width: 16px; 
      border-radius: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${
        theme?.palette?.neutral?.N30 || inube.palette.neutral.N30
      };
      border-radius: 8px;
    }
  `}
`;

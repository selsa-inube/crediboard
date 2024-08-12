import styled from "styled-components";
import { inube } from "@inube/design-system";

interface IStyledContainerFieldset {
  $aspectRatio?: string;
  $isMobile: boolean;
  $hasTable: boolean;
  $hasOverflow?: boolean;
}

export const StyledContainerFieldset = styled.div<IStyledContainerFieldset>`
  overflow-y: ${({ $hasOverflow }) => ($hasOverflow ? "none" : "auto")};
  border-radius: 8px;
  border-width: 2px;
  border-style: solid;
  aspect-ratio: ${({ $aspectRatio, $isMobile }) => !$isMobile && $aspectRatio};
  border-color: ${({ theme }) =>
    theme?.color?.stroke?.gray?.regular || inube.color.stroke.gray.regular};
  box-shadow: 0px 2px 6px
    ${({ theme }) =>
      theme?.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
  padding-top: ${({ theme, $hasTable }) =>
    !$hasTable && (theme?.spacing?.s200 || inube.spacing.s200)};
  padding-bottom: ${({ theme, $hasTable }) =>
    !$hasTable && (theme?.spacing?.s200 || inube.spacing.s200)};
  padding-right: ${({ theme, $hasTable }) =>
    !$hasTable && (theme?.spacing?.s100 || inube.spacing.s100)};
  padding-left: ${({ theme, $hasTable }) =>
    !$hasTable && (theme?.spacing?.s100 || inube.spacing.s100)};

  &::-webkit-scrollbar {
    border-radius: 8px;
    width: 16px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
      theme?.color?.surface?.gray?.regular || inube.color.surface.gray.regular};
    border-radius: 8px;
  }

`;

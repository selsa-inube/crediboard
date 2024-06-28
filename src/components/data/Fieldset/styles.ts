import styled from "styled-components";
import { inube } from "@inube/design-system";

interface IStyledContainerFieldset {
  $aspectRatio?: string;
  $hiddenScroll?: boolean;
  $isMobile?: boolean;
}

const getScrollbarWidth = ($hiddenScroll?: boolean, $isMobile?: boolean) => {
  if ($hiddenScroll) return "0px";
  return $isMobile ? "10px" : "17px";
};

export const StyledContainerFieldset = styled.div<IStyledContainerFieldset>`
  overflow-y: auto;
  border-radius: 8px;
  border-width: 2px;
  border-style: solid;
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
  border-color: ${({ theme }) =>
    theme?.color?.stroke?.gray?.regular || inube.color.stroke.gray.regular};
  box-shadow: 0px 2px 6px
    ${({ theme }) =>
      theme?.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
  padding: ${({ theme, $isMobile }) =>
    $isMobile
      ? theme?.spacing?.s100 || inube.spacing.s100
      : theme?.spacing?.s200 || inube.spacing.s200};

  &::-webkit-scrollbar {
    border-radius: 8px;
    width: ${({ $hiddenScroll, $isMobile }) =>
      getScrollbarWidth($hiddenScroll, $isMobile)};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
      theme?.color?.surface?.gray?.regular || inube.color.surface.gray.regular};
    border-radius: 8px;
  }
`;

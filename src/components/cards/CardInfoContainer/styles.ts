import styled from "styled-components";
import { inube } from "@inube/design-system";

interface IStyledContainerCardInfo {
  $containerHeight?: string;
  $isMobile?: boolean;
}

export const StyledContainerCardInfo = styled.div<IStyledContainerCardInfo>`
  overflow-y: ${({ $isMobile }) => ($isMobile ? "hidden" : "auto")};
  border-radius: 8px;
  border-width: 2px;
  border-style: solid;
  height: ${({ $containerHeight }) => $containerHeight};
  border-color: ${({ theme }) =>
    theme?.color?.stroke?.primary?.regular ||
    inube.color.stroke.primary.regular};
  box-shadow: 0px 2px 6px
    ${({ theme }) =>
      theme?.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
  padding: ${({ theme, $isMobile }) =>
    $isMobile
      ? theme?.spacing?.s100 || inube.spacing.s100
      : theme?.spacing?.s200 || inube.spacing.s200};

  ${({ $isMobile, theme }) =>
    !$isMobile &&
    `
    &::-webkit-scrollbar {
      width: 8px;  
      border-radius: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${
        theme?.color?.surface?.gray?.regular || inube.color.surface.gray.regular
      };
      border-radius: 8px;
    }
  `}
`;

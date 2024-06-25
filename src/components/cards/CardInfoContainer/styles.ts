import styled from "styled-components";
import { inube } from "@inube/design-system";

interface IStyledContainerCardInfo {
  $aspectRatio?: string;
  $containerHeight?: string;
  $isMobile: boolean;
}

export const StyledContainerCardInfo = styled.div<IStyledContainerCardInfo>`
  overflow-y: auto;
  border-radius: 8px;
  border-width: 2px;
  border-style: solid;
  height: ${({ $containerHeight }) => $containerHeight};
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
  border-color: ${({ theme }) =>
    theme?.color?.stroke?.primary?.regular ||
    inube.color.stroke.primary.regular};
  box-shadow: 0px 2px 6px
    ${({ theme }) =>
      theme?.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
  padding: ${({ theme }) => theme?.spacing?.s200 || inube.spacing.s200};

  ${({ $isMobile, theme }) =>
    !$isMobile &&
    `
    &::-webkit-scrollbar {
      width: 8px;  /* Añade el ancho del scrollbar */
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

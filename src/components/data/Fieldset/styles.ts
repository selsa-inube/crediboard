import styled from "styled-components";
import { inube } from "@inube/design-system";

interface IStyledContainerFieldset {
  $aspectRatio?: string;
  $isMobile: boolean;
}

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
  padding-top: ${({ theme }) => theme?.spacing?.s200 || inube.spacing.s200};
  padding-bottom: ${({ theme }) => theme?.spacing?.s200 || inube.spacing.s200};
  padding-right: ${({ theme }) => theme?.spacing?.s100 || inube.spacing.s100};
  padding-left: ${({ theme }) => theme?.spacing?.s100 || inube.spacing.s100};

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

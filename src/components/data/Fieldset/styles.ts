import styled from "styled-components";
import { inube } from "@inube/design-system";

interface IStyledContainerFieldset {
  $aspectRatio?: string;
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
  padding: ${({ theme }) => theme?.spacing?.s200 || inube.spacing.s200};

  &::-webkit-scrollbar {
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
      theme?.color?.surface?.gray?.regular || inube.color.surface.gray.regular};
    border-radius: 8px;
  }
`;

import styled from "styled-components";
import { inube } from "@inube/design-system";

interface IStyledModal {
  $smallScreen: boolean;
}

export const StyledModal = styled.div<IStyledModal>`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: ${({ $smallScreen }) => ($smallScreen ? "280px" : "500px")};
  background-color: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
  padding: ${({ $smallScreen }) =>
    $smallScreen ? inube.spacing.s200 : inube.spacing.s300};
  gap: ${({ $smallScreen }) =>
    $smallScreen ? inube.spacing.s200 : inube.spacing.s300};
  border-radius: ${inube.spacing.s100};
`;

export const StyledContainerContent = styled.div<IStyledModal>`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  ${({ $smallScreen, theme }) =>
    !$smallScreen &&
    `
    &::-webkit-scrollbar {
      width: 16px;
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

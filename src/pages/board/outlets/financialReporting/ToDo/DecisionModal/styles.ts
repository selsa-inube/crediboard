import styled from "styled-components";
import { inube } from "@inube/design-system";

interface IStyledModal {
  $smallScreen: boolean;
  theme?: typeof inube;
}

const StyledModal = styled.div<IStyledModal>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) =>
    theme?.color?.surface?.light?.clear || inube.color.surface.light.clear};
  max-height: "382px"
  height: ${({ $smallScreen }) => ($smallScreen ? "340px" : "448px")};
  width: ${({ $smallScreen }) => ($smallScreen ? "350px" : "500px")};
  padding: ${({ $smallScreen }) =>
    $smallScreen ? inube.spacing.s200 : inube.spacing.s300};
  gap: ${({ $smallScreen }) =>
    $smallScreen ? inube.spacing.s200 : inube.spacing.s300};
  border-radius: ${inube.spacing.s100};
`;

const StyledContainerClose = styled.div`
  cursor: pointer;
`;

const StyledContainerTextField = styled.div<IStyledModal>`
  height: ${({ $smallScreen }) => ($smallScreen ? "40px" : "65px")};
  width: auto;
  border-radius: 8px;
  padding: 6px 16px 6px 16px;
  gap: 16px;
  margin: 0 0 24px 0;
  overflow-y: auto;
  background-color: ${({ theme }) =>
    theme?.color?.surface?.gray?.clear || inube.color.surface.gray.clear};

  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
      theme?.color?.surface?.light?.clear || inube.color.surface.gray.regular};
    border-radius: 8px;
  }
`;

export { StyledModal, StyledContainerClose, StyledContainerTextField };

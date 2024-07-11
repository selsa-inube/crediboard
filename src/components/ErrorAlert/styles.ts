import styled from "styled-components";
import { inube } from "@inube/design-system";

interface AlertContainerProps {
  $visible: boolean;
  $top: string;
  $left: string;
}

export const AlertContainer = styled.div<AlertContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) =>
    theme?.color?.stroke?.gray?.regular || inube.color.surface.warning.clear};
  padding: 8px;
  border-radius: 4px;
  border: 1px solid
    ${({ theme }) =>
      theme?.color?.stroke?.gray?.regular || inube.color.surface.gray.regular};
  font-weight: 500;
  position: absolute;
  max-width: 328px;
  z-index: 1000;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  transform: translate(-50%, 0);
`;

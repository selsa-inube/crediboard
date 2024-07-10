import styled from 'styled-components';
import { inube } from "@inube/design-system";

interface AlertContainerProps {
  $visible: boolean;
}

export const AlertContainer = styled.div<AlertContainerProps>`
  display: ${({ $visible }) => ($visible ? "flex" : "none")};
  align-items: center;
  background-color: ${({ theme }) =>
    theme?.color?.stroke?.gray?.regular || inube.color.surface.warning.clear};
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) =>
     theme?.color?.stroke?.gray?.regular || inube.color.surface.gray.regular};
  font-weight: 500;
  position: fixed;
  top: 62px;
  left: 0;
  right: 0;
  margin: auto;
  max-width: 328px;
  z-index: 1000;
`;

import styled from "styled-components";
import { inube } from "@inube/design-system";

interface AlertContainerProps {
  $top: string;
  $left: string;
}

export const AlertContainer = styled.div<AlertContainerProps>`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) =>
    theme?.color?.stroke?.gray?.regular || inube.color.surface.warning.clear};
  padding: 7px;
  border-radius: 4px;
  border: 1px solid
    ${({ theme }) =>
      theme?.color?.stroke?.gray?.regular || inube.color.surface.gray.regular};
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  transform: translateX(-50%);
  
  @media (max-width: 350px) {
    position: fixed;
    flex-direction: column;
    align-items: flex-start;
    padding: 8px 5px;
  }
`;

export const AlertText = styled.div`
  margin: 0 10px;
  font-family: Roboto;
  font-size: 14px;
  margin-right: 85px;
  white-space: nowrap;
`;

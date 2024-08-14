import styled from "styled-components";
import { inube } from "@inube/design-system";

export const StyledItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid
    ${({ theme }) =>
      theme.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
`;
export const StyledMessageContainer = styled.div`
  position: fixed;
  bottom: 18px;
  right: 75px;
`;

interface IStyledToast {
  $isMobile: boolean;
}

export const StyledToast = styled.div<IStyledToast>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 2;
  position: absolute;
  gap: 4px;
  opacity: ${({ $isMobile }) => ($isMobile ? "1" : "0.8")};
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

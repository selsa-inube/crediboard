import styled from "styled-components";
import { inube } from "@inubekit/foundations";

export const StyledItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid
    ${({ theme }) =>
    theme.color?.stroke?.divider?.regular || inube.palette.neutral.N40};
`;
export const StyledMessageContainer = styled.div`
  position: fixed;
  bottom: 18px;
  right: 75px;
  z-index: 2;
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

export const StyledHorizontalDivider = styled.hr`
  margin: 0px;
  width: 2px;
  border: none;
  background-color: ${({ theme }) =>
    theme?.color?.stroke?.divider?.regular || inube.palette.neutral.N40};
`;

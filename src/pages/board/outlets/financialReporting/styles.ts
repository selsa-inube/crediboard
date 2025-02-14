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

export const StyledScreenPrint = styled.div<IStyledToast>`
  display: grid;
  grid-template-columns: ${({ $isMobile }) =>
    $isMobile ? "1fr" : "repeat(2, 1fr)"};
  gap: 16px;

  @media print {
    display: grid;
    grid-template-columns: 1fr;
    gap: 35px;
  }

  & > div:nth-child(2),
  & > div:nth-child(3),
  & > div:nth-child(5),
  & > div:nth-child(6) {
    @media print {
      height: 100%;
    }
  }

  & > div:nth-child(2) {
    @media print {
      margin-top: 35px;
    }
  }
`;

export const StyledPageBreak = styled.div`
  @media print {
    page-break-before: always;
  }
`;

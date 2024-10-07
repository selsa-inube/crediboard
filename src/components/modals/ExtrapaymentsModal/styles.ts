import styled from "styled-components";
import { inube } from "@inubekit/foundations";

interface IStyledModal {
  $smallScreen: boolean;
}

export const StyledContainer = styled.div<IStyledModal>`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
      max-height: ${({ $smallScreen }) => ($smallScreen ? "565" : "700px")};
      width: ${({ $smallScreen }) => ($smallScreen ? "335px" : "850px")};
  border-radius: 8px;
`;

export const StyledContainerClose = styled.div`
  cursor: pointer;
`;

import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

export const StyledContainerClose = styled.div`
  cursor: pointer;
`;
export const StyledModalWrapper = styled.div`
  div {
    z-index: 0;
  }
`;
export const StyledContainer = styled.div`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  border-radius: 8px;
`;

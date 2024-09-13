import styled from "styled-components";
import { inube } from "@inubekit/foundations";

const StyledContainer = styled.div`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  border-radius: 8px;
`;

const StyledIncome = styled.div`
  overflow: auto;

  &::-webkit-scrollbar {
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
      theme?.palette?.neutral?.N50 || inube.palette.neutral.N50};
    border-radius: 8px;
  }
`;

const StyledContainerClose = styled.div`
  cursor: pointer;
`;

export { StyledContainer, StyledContainerClose, StyledIncome };

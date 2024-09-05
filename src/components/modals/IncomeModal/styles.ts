import styled from "styled-components";
import { inube } from "@inubekit/foundations";

const StyledContainer = styled.div`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N20 || inube.palette.neutral.N20};
  box-shadow: 0px 2px 6px
    ${({ theme }) => theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
  border-radius: 5px;
`;

const StyledTextField = styled.div`
  margin: 5px 0px;
  div > div:nth-child(2) {
    background-color: ${({ theme }) =>
      theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  }
`;

export { StyledContainer, StyledTextField };

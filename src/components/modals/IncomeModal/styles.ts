import styled from "styled-components";
import { inube } from "@inubekit/foundations";

const StyledContainer = styled.div`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  box-shadow: 0px 2px 6px
    ${({ theme }) => theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
  border-radius: 5px;
  border: solid 1px ${({ theme }) => theme?.palette?.neutral?.N70 || inube.palette.neutral.N70};;
  overflow: hidden;
`;

const StyledTextField = styled.div`
  margin: 5px 0px;
  div > div:nth-child(2) {
    background-color: ${({ theme }) =>
      theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  }
`;

export { StyledContainer, StyledTextField };

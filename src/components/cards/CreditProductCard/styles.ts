import styled from "styled-components";
import { inube } from "@inubekit/foundations";

const StyledCreditProductCard = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 217px;
  height: 414px;
  border-radius: 8px;
  outline: 2px solid
    ${({ theme }) => theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  box-shadow: 0px 4px 8px 3px rgba(9, 30, 66, 0.13);
`;

const StyledDivider = styled.hr`
  margin: 0;
  width: 100%;
  border: none;
  border-top: 2px solid;
  border-top-color: ${({ theme }) =>
    theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
`;

export { StyledCreditProductCard, StyledDivider };

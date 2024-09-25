import styled from "styled-components";
import { inube } from "@inubekit/foundations";
import { DefaultTheme } from "styled-components";

interface IStyledDivider {
  theme?: DefaultTheme;
}

const StyledDivider = styled.hr<IStyledDivider>`
  margin: 0;
  width: 100%;
  border: none;
  border-top: 2px solid;
  background-color: red;
  border-top-color: ${({ theme }) =>
    theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
`;

const StyledContainerToCenter = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1520px;
  margin: auto;
`;

export { StyledDivider, StyledContainerToCenter };

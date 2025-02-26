import { inube } from "@inubekit/foundations";
import styled from "styled-components";

interface IStyledImage {
  width?: string;
}

const StyledWelcomeContainer = styled.div`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
`;

const StyledOutletContainer = styled(StyledWelcomeContainer)`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
`;

const StyledImage = styled.img<IStyledImage>`
  width: ${({ width }) => width};
  max-width: 1200px;
`;

export { StyledWelcomeContainer, StyledOutletContainer, StyledImage };

import styled from "styled-components";
import { inube } from "@inubekit/foundations";

interface IStyledModal {
  $smallScreen: boolean;
}

const StyledContainer = styled.div<IStyledModal>`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  max-height: ${({ $smallScreen }) => ($smallScreen ? "auto" : "936px")};
  width: ${({ $smallScreen }) => ($smallScreen ? "auto" : "auto")};
  border-radius: 8px;
`;


const StyledContainerClose = styled.div`
  cursor: pointer;
`;

export { StyledContainer, StyledContainerClose };

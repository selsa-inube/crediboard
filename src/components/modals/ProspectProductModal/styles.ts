import styled from "styled-components";
import { inube } from "@inubekit/foundations";

interface IStyledModal {
  $smallScreen: boolean;
}

const ScrollableContainer = styled.div<IStyledModal>`
  width: ${({ $smallScreen }) => ($smallScreen ? "270px" : "440px")};
  padding: 10px;
  overflow: auto;
  display: flex;

  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
      theme?.palette?.neutral?.N50 || inube.palette.neutral.N50};
    border-radius: 8px;
  }
`;

export { ScrollableContainer };

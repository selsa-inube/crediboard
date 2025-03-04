import styled from "styled-components";
import { inube } from "@inubekit/foundations";

interface IStyledModal {
  $smallScreen: boolean;
}

const ScrollableContainer = styled.div<IStyledModal>`
  width: 600px;
  padding: 10px;
  overflow: ${({ $smallScreen }) => ($smallScreen ? "auto" : "visable")};
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

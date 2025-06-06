import styled from "styled-components";
import { inube } from "@inubekit/inubekit";

interface IStyledModal {
  $smallScreen: boolean;
}

interface IStyledSearchUserCard {
  $isActive: boolean;
  $smallScreen: boolean;
}
const StyledModal = styled.div<IStyledModal>`
  display: flex;
  flex-direction: column;
  background-color: ${inube.palette.neutral.N0};
  width: ${(props) => (props.$smallScreen ? "335px" : "450px")};
  height: auto;
  border-radius: 8px;
  padding: 24px;
  gap: 24px;
  box-sizing: border-box;
`;

const StyledContainerButton = styled.div`
  & button {
    display: flex;
    padding-right: 0;
    justify-content: flex-end;
  }
`;

const StyledFilterdUserCard = styled.div<IStyledSearchUserCard>`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid
    ${({ theme }) => theme.palette?.neutral?.N40 || inube.palette.neutral.N40};
  padding: 8px;
  background-color: ${inube.palette.neutral.N30};
  max-width: 100%;
  width: 90%;
  position: relative;
`;

export { StyledModal, StyledContainerButton, StyledFilterdUserCard };

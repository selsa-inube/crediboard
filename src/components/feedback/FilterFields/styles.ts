import styled from "styled-components";

import { inube } from "@inubekit/inubekit";

interface IStyledSearchUserCard {
  $isActive: boolean;
  $smallScreen: boolean;
}

const StyledSearchUserCard = styled.div<IStyledSearchUserCard>`
  border-radius: 8px;
  border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
  padding: 12px;
  display: ${({ $smallScreen }) => ($smallScreen ? "none" : "block")};
  width: 687px;
`;

const StyledButtonFilter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const StyledFilterdUserCard = styled.div<IStyledSearchUserCard>`
  display: flex;
  gap: 8px;
  width: 100%;
  height: 36px;
  border-radius: 8px;
  align-items: center;
  padding-left: 10px;
  border: 1px solid
    ${({ theme }) => theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
  background-color: ${inube.palette.neutral.N30};
  & > * {
    cursor: pointer;
  }
`;
export { StyledSearchUserCard, StyledFilterdUserCard, StyledButtonFilter };

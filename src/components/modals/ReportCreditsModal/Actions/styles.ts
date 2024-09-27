import styled from "styled-components";
import { inube } from "@inubekit/foundations";

const StyledContainer = styled.div`
  position: absolute;
  z-index: 99;

  figure {
    margin-right: 5px;
  }

  div > figure {
    position: absolute;
    right: 2%;
  }
`;

const StyledUl = styled.ul`
  margin: 0px 30px 0px 0px;
  padding: 0px;
`;

const StyledLi = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  padding: 6px 0px;
  cursor: pointer;
`;
const StyledActions = styled.div`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  position: absolute;
  top: -20px;
  right: -55px;
  border-radius: 4px;
  box-shadow: 8px 2px 6px
    ${({ theme }) => theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
`;

const StyledContainerClose = styled.div`
  cursor: pointer;
`;

export {
  StyledContainer,
  StyledUl,
  StyledLi,
  StyledActions,
  StyledContainerClose,
};

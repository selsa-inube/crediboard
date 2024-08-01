import styled from "styled-components";

export const StyledContainer = styled.div`
  box-shadow: 2px 2px 8px 1px #00000040;
  background-color: white;
  border-radius: 4px;
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 99;

  figure{
    margin-right: 5px;
  }

  div > figure{
    position: absolute;
    right: 2%;
  }
`;

export const StyledUl = styled.ul`
    margin: 0px;
    padding: 0px;
    margin-right: 30px;
`

export const StyledLi = styled.li`
    list-style: none;
    display: flex;
    align-items: center;
    margin: 4px 0px;
`

import styled from "styled-components";
import { inube } from "@inubekit/foundations";

export const StyledContainer = styled.div`
  box-shadow: 2px 2px 3px 2px
    ${({ theme }) => theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
  border-radius: 8px;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  margin-left: 1%;
  margin-top: 60px;
  position: absolute;
  z-index: 1;
`;

export const StyledUl = styled.ul`
  margin: 0;
`;

export const StyledItem = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
`;

export const StyledImg = styled.img`
  position: relative;
  width: 120px;
  height: 41px;
  right: 20px;
  padding-right: 20px;
  padding-bottom: 5px;
  padding-top: 5px;
  object-fit: contain;
`;

export const StyledHr = styled.hr`
  position: relative;
  right: 25px;
  width: 115%;
  border: 0;
  border-top: 2px solid;
  border-color: ${({ theme }) =>
    theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
  margin: 0;
`;
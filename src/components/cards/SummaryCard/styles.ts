import styled from "styled-components";
import { inube } from "@inubekit/foundations";
import { Link } from "react-router-dom";



const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
  flex-direction: column;
  padding: ${({ theme }) => (theme ? "8px" : "16px")};
  justify-content: space-between;
  height: 100%;
`;

const StyledSummaryCard = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 260px;
  height: 270px;
  border-radius: 8px;
  outline: 1px solid
    ${({ theme }) =>
      theme?.palette?.neutral?.N200 || inube.palette.neutral.N200};
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.5);
`;

const StyledDivider = styled.hr`
  margin: 0;
  width: 100%;
  border: none;
  border-top: 2px solid;
  border-top-color: ${({ theme }) =>
    theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
`;

export { StyledLink, StyledSummaryCard, StyledDivider };

import styled from "styled-components";
import { inube } from "@inube/design-system";
import { Link } from "react-router-dom";

interface IStyledSummaryCard {
  theme?: typeof inube;
}

const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
  flex-direction: column;
  padding: ${({ theme }) => theme?.spacing?.s100 || inube.spacing.s100};
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
    ${({ theme }: IStyledSummaryCard) =>
      theme?.color?.stroke?.gray?.regular || inube.color.stroke.gray.regular};
  background-color: ${({ theme }: IStyledSummaryCard) =>
    theme?.color?.surface?.light?.clear || inube.color.surface.light.clear};
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.5);
`;

const StyledDivider = styled.hr`
  margin: ${inube.spacing.s0};
  width: 100%;
  border: none;
  border-top: 2px solid;
  border-top-color: ${({ theme }: IStyledSummaryCard) =>
    theme?.color?.stroke?.divider?.regular ||
    inube.color.stroke.divider.regular};
`;

export { StyledLink, StyledSummaryCard, StyledDivider };

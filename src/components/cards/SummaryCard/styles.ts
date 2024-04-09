import styled from "styled-components";
import { inube } from "@inube/design-system";

interface IStyledSummaryCard {
  theme?: typeof inube;
}

const StyledSummaryCard = styled.label`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 260px;
  height: 270px;
  border-radius: 8px;
  outline: 2px solid #938e8a;
  background-color: ${({ theme }: IStyledSummaryCard) =>
    theme?.color?.surface?.light?.clear || inube.color.surface.light.clear};
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.5);
`;

const StyledDivider = styled.div`
  border: 1px solid
    ${({ theme }: IStyledSummaryCard) =>
      theme?.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
`;

export { StyledSummaryCard, StyledDivider };

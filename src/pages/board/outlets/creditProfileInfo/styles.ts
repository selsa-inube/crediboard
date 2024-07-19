import styled from "styled-components";
import { inube } from "@inube/design-system";

interface IStyledDivider {
  theme?: typeof inube;
}

const StyledDivider = styled.hr`
  margin: ${inube.spacing.s0};
  width: 100%;
  border: none;
  border-top: 2px solid;
  border-top-color: ${({ theme }: IStyledDivider) =>
    theme?.color?.stroke?.divider?.regular ||
    inube.color.stroke.divider.regular};
`;

const StyledContainerToCenter = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1520px;
  margin: auto;
`;

export { StyledDivider, StyledContainerToCenter };

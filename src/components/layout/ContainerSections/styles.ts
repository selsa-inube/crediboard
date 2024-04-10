import styled from "styled-components";
import { inube } from "@inube/design-system";

export const StyledHorizontalRule = styled.hr`
  margin: 0px;
  width: 1px;
  background-color: ${({ theme }) =>
    theme?.color?.stroke?.divider?.regular ||
    inube.color.stroke.divider.regular};
`;

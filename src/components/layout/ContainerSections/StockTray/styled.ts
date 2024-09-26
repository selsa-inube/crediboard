import styled from "styled-components";

import { inube } from "@inube/design-system";

export const StyledHorizontalDivider = styled.hr`
  margin: 0px;
  width: 2px;
  border: none;
  background-color: ${({ theme }) =>
    theme?.color?.stroke?.divider?.regular ||
    inube.color.stroke.divider.regular};
`;

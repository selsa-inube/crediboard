import styled from "styled-components";

import { inube } from "@inubekit/foundations";

export const StyledHorizontalDivider = styled.hr`
  margin: 0px;
  width: 2px;
  border: none;
  background-color: ${({ theme }) =>
    theme?.color?.stroke?.divider?.regular || inube.palette.neutral.N40};
`;

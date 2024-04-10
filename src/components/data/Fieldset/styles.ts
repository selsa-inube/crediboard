import styled from "styled-components";

import { inube } from "@inube/design-system";

export const StyledContainerFieldset = styled.div`
  border-color: ${({ theme }) =>
    theme?.color?.stroke?.divider?.regular ||
    inube.color.stroke.divider.regular};
  border-radius: 15px;
  border-width: 4px;
  border-style: solid;
  padding: ${({ theme }) => theme?.spacing?.s200 || inube.spacing.s200};
`;

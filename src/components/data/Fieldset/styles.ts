import styled from "styled-components";

import { inube } from "@inube/design-system";

export const StyledContainerFieldset = styled.div`
  border-color: ${inube.color.stroke.divider.regular};
  border-radius: 15px;
  border-width: 4px;
  border-style: solid;
  padding: ${({ theme }) => theme?.spacing?.s200 || inube.spacing.s200};
`;

/* const StyledFieldset = styled.fieldset`
  border-radius: 15px;
  border-style: solid;
  border-color: ${inube.color.stroke.divider.regular};
  padding: 14px 24px 24px 24px;
`; */

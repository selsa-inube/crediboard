import styled from "styled-components";
import { inube } from "@inube/design-system";

export const StyledContainerFieldset = styled.div`
  overflow-y: auto;
  border-radius: 8px;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ theme }) =>
    theme?.color?.stroke?.gray?.regular || inube.color.stroke.gray.regular};
  box-shadow: 0px 2px 6px
    ${({ theme }) =>
      theme?.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
  padding: ${({ theme }) => theme?.spacing?.s200 || inube.spacing.s200};
`;

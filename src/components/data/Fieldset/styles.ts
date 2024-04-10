import styled from "styled-components";
import { inube } from "@inube/design-system";

export const StyledContainerFieldset = styled.div`
  border-radius: 15px;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ theme }) =>
    theme?.color?.stroke?.divider?.regular ||
    inube.color.stroke.divider.regular};
  box-shadow: 2px 2px 6px
    ${({ theme }) =>
      theme?.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
  padding: ${({ theme }) => theme?.spacing?.s200 || inube.spacing.s200};
`;

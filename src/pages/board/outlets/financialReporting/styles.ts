import styled from "styled-components";
import { inube } from "@inube/design-system";

export const StyledItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid
    ${({ theme }) =>
      theme.color?.stroke?.divider?.regular ||
      inube.color.stroke.divider.regular};
`;
export const StyledMessageContainer = styled.div`
  position: fixed;
  bottom: 18px;
  right: 75px;
`;

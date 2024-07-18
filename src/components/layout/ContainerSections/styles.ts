import styled from "styled-components";
import { inube } from "@inube/design-system";

export const StyledHorizontalDivider = styled.hr`
  margin: ${inube.spacing.s0};
  width: 2px;
  border: none;
  background-color: ${({ theme }) =>
    theme?.color?.stroke?.divider?.regular ||
    inube.color.stroke.divider.regular};
`;

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

export const StyledContainerToCenter = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 calc(100%-1192px);
  align-items: center;
`;

export const StyledMenu = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  position: absolute;
  top: 56px;
  padding: 16px;
  border: 1px solid ${inube.color.stroke.divider.regular};
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 320px; 
`;

export const StyledMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 20px; 
  font-weight: bold; 
`;

export const StyledCloseIcon = styled.div`
  cursor: pointer;
  font-size: 16px; 
`;

export const StyledMenuItem = styled.div`
  padding: 12px 0; 
  cursor: pointer;
  font-size: 16px; 
  &:hover {
    background-color: ${inube.color.surface.hover};
  }
  &:not(:last-child) {
    border-bottom: none; 
  }
`;

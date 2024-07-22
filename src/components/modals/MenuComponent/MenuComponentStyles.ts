import styled from 'styled-components';
import { inube } from "@inube/design-system";

export const StyledMenu = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  position: fixed; 
  top: 56px;
  right: 0; 
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
  font-size: 14px; 
  &:not(:last-child) {
    border-bottom: none; 
  }
`;

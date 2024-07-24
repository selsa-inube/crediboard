import styled from 'styled-components';
import { inube } from "@inube/design-system";

export const StyledMenu = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) =>
  theme?.color?.surface?.light?.clear || inube.color.surface.light.clear};
  position: fixed; 
  top: 56px;
  right: 0; 
  padding: ${({ theme}) =>
  (theme?.spacing?.s200 || inube.spacing.s200)};
  border: 1px solid ${inube.color.stroke.divider.regular};
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 320px; 
`;



export const StyledMenuItem = styled.div`
  padding: 12px 0; 
  cursor: pointer;
  font-size: 14px; 
  &:not(:last-child) {
    border-bottom: none; 
  }
`;

import styled from 'styled-components';

export const AlertContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #FFFAE6;
  color: #091E42;
  padding: 12px;
  border-radius: 4px;
  font-weight: 500;
  font-family: Roboto;
  border: #d4d4d4 1px solid;
  position: fixed;
  top: 62px;
  left: 0;
  right: 0;
  margin: auto;
  max-width: 330px;
  z-index: 1000;
`;

export const Text = styled.span`
  flex: 1; 
  margin-right: 45px; 
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
`;
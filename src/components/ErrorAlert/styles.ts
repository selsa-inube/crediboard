import styled from 'styled-components';

interface AlertContainerProps {
  $visible: boolean;
}

export const AlertContainer = styled.div<AlertContainerProps>`
  display: ${({ $visible }) => ($visible ? "flex" : "none")};
  align-items: center;
  background-color: #fffae6;
  color: #091E42;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #efefef;
  font-weight: 500;
  font-family: Roboto;
  position: fixed;
  top: 62px;
  left: 0;
  right: 0;
  margin: auto;
  max-width: 330px;
  z-index: 1000;
`;

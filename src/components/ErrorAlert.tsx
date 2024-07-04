import React from 'react';
import styled from 'styled-components';
import { MdWarningAmber, MdClear } from 'react-icons/md'; 

const AlertContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #FFFAE6;
  color: #091E42;
  padding: 12px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 16px;
  font-family: Roboto;
  position: relative;
  border: #d4d4d4 1px solid;
  margin: auto;
  max-width: 330    px;
`;
const AlertIcon = styled(MdWarningAmber)`
  margin-right: 20px; 
  font-size: 24px; 
  color: #FF991F;
`;

const Text = styled.span`
  flex: 1; 
  margin-right: 45px; 
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const CloseIcon = styled(MdClear)`
  font-size: 16px; 
`;

interface ErrorAlertProps {
  errorKey: boolean;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ errorKey }) => {
  const [visible, setVisible] = React.useState(errorKey);

  React.useEffect(() => {
    setVisible(errorKey);
  }, [errorKey]);

  if (!visible) return null;

  return (
    <AlertContainer>
      <AlertIcon />
      <Text>Existe un error sin evaluar</Text>
      <CloseButton onClick={() => setVisible(false)}>
        <CloseIcon />
      </CloseButton>
    </AlertContainer>
  );
};

export default ErrorAlert;

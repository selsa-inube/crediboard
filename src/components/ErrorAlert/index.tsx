import React from 'react';
import {
  AlertContainer,
  AlertIcon,
  Text,
  CloseButton,
  CloseIcon
} from './styles';

export interface ErrorAlertProps {
  errorKey: boolean;
  message?: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ errorKey, message }) => {
  const [visible, setVisible] = React.useState(errorKey);

  React.useEffect(() => {
    setVisible(errorKey);
  }, [errorKey]);

  if (!visible) return null;

  return (
    <AlertContainer>
      <AlertIcon />
      <Text>{message || 'Existe un error sin evaluar'}</Text>
      <CloseButton onClick={() => setVisible(false)}>
        <CloseIcon />
      </CloseButton>
    </AlertContainer>
  );
};

export default ErrorAlert;

import { useState } from "react";
import { Icon } from "@inubekit/icon";
import { MdWarningAmber, MdClear } from "react-icons/md";
import { AlertContainer, Text, CloseButton } from "./styles";

export interface ErrorAlertProps {
  errorKey: boolean;
  message?: string;
}

const ErrorAlert = ({ errorKey, message }: ErrorAlertProps) => {
  const [visible, setVisible] = useState(errorKey);
  const handleClose = () => {
    setVisible(false);
  };

  return (
    <AlertContainer style={{ display: visible ? "flex" : "none" }}>
      <Icon
        appearance="warning"
        icon={<MdWarningAmber />}
        size="24px"
      />
      <Text>{message || "Existe un error sin evaluar"}</Text>
      <CloseButton onClick={handleClose}>
        <Icon
          appearance="dark"
          icon={<MdClear />}
          size="16px"
        />
      </CloseButton>
    </AlertContainer>
  );
};

export default ErrorAlert;

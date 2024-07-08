import { useState } from "react";
import { Icon } from "@inubekit/icon";
import { MdWarningAmber, MdClear } from "react-icons/md";
import { AlertContainer, Text } from "./styles";

export interface ErrorAlertProps {
  errorKey: boolean;
  message?: string;
  onClose: () => void;
}

const ErrorAlert = ({ errorKey, message, onClose }: ErrorAlertProps) => {
  const [visible, setVisible] = useState(errorKey);

  const handleClose = () => {
    setVisible(false);
    onClose();
  };

  return (
    <AlertContainer style={{ display: visible ? "flex" : "none" }}>
      <Icon
        appearance="warning"
        icon={<MdWarningAmber />}
        size="24px"
      />
      <Text>{message || "Existe un error sin evaluar"}</Text>
      <Icon
        appearance="dark"
        icon={<MdClear />}
        size="18px"
        cursorHover
        onClick={handleClose}
      />
    </AlertContainer>
  );
};

export default ErrorAlert;

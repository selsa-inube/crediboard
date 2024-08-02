import { Icon } from "@inubekit/icon";
import { MdWarningAmber, MdClear } from "react-icons/md";
import { AlertContainer, AlertText } from "./styles";

import { messages } from "./config"; // Adjust the import path as needed

export interface ErrorAlertProps {
  message?: string;
  onClose?: () => void;
}

const ErrorAlert = (props: ErrorAlertProps) => {
  const { message, onClose } = props;

  return (
    <AlertContainer>
      <Icon appearance="warning" icon={<MdWarningAmber />} size="24px" />
      <AlertText>{message || messages.defaultError}</AlertText>
      <Icon
        appearance="dark"
        icon={<MdClear />}
        size="16px"
        cursorHover
        onClick={onClose}
      />
    </AlertContainer>
  );
};

export { ErrorAlert };

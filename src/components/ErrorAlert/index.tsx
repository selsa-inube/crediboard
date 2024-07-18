import { Icon } from "@inubekit/icon";
import { MdWarningAmber, MdClear } from "react-icons/md";
import { AlertContainer, AlertText } from "./styles";

import { messages } from "./config"; // Adjust the import path as needed

export interface ErrorAlertProps {
  message?: string;
  onClose: () => void;
  top: string;
  left: string;
  showError: boolean;
}

const ErrorAlert = (props: ErrorAlertProps) => {
  const { message, onClose, top, left, showError } = props;

  if (!showError) {
    return null;
  }

  return (
    <AlertContainer $top={top} $left={left}>
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

import { Icon } from "@inubekit/icon";
import { MdWarningAmber, MdClear } from "react-icons/md";
import { AlertContainer, AlertText } from "./styles";

export interface ErrorAlertProps {
  message?: string;
  onClose: () => void;
  top: string;
  left: string;
}

const ErrorAlert = (props: ErrorAlertProps) => {
  const { message, onClose, top, left } = props;

  return (
    <AlertContainer $top={top} $left={left}>
      <Icon appearance="warning" icon={<MdWarningAmber />} size="24px" />
      <AlertText>{message || "Existe un error sin evaluar"}</AlertText>
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

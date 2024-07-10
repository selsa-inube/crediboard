import { Icon } from "@inubekit/icon";
import { Text } from "@inubekit/text";
import { MdWarningAmber, MdClear } from "react-icons/md";
import { AlertContainer } from "./styles";

export interface ErrorAlertProps {
  message?: string;
  onClose: () => void;
}

const ErrorAlert = (props: ErrorAlertProps) => {
  const { message, onClose } = props;

  return (
    <AlertContainer $visible={true}>
      <Icon appearance="warning" icon={<MdWarningAmber />} size="24px" />
      <Text size="large" padding="0px 70px 0px 10px">
        {message || "Existe un error sin evaluar"}
      </Text>
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

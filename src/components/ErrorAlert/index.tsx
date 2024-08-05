import { MdWarningAmber, MdClear } from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { Text } from "@inube/design-system";

import { AlertContainer } from "./styles";
import { messages } from "./config";
import { Stack } from "@inubekit/stack";

export interface ErrorAlertProps {
  message?: string;
  onClose?: () => void;
  top?: number;
}

const ErrorAlert = (props: ErrorAlertProps) => {
  const { message, onClose, top } = props;

  return (
    <AlertContainer $top={top!}>
      <Icon appearance="warning" icon={<MdWarningAmber />} size="24px" />
      <Stack>
        <Text>{message || messages.defaultError}</Text>
      </Stack>
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

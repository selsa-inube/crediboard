import { MdWarningAmber, MdClear } from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { AlertContainer, StyledPrint } from "./styles";
import { messages } from "./config";

export interface ErrorAlertProps {
  message?: string;
  onClose?: () => void;
}

const ErrorAlert = (props: ErrorAlertProps) => {
  const { message, onClose } = props;

  return (
    <StyledPrint>
      <AlertContainer>
        <Stack
          alignItems="center"
          justifyContent="space-between"
          gap="20px"
          width="100%"
        >
          <Icon appearance="warning" icon={<MdWarningAmber />} size="24px" />

          <Stack justifyContent="center">
            <Text>{message || messages.defaultError}</Text>
          </Stack>

          <Icon
            appearance="dark"
            icon={<MdClear />}
            size="16px"
            cursorHover
            onClick={onClose}
          />
        </Stack>
      </AlertContainer>
    </StyledPrint>
  );
};

export { ErrorAlert };

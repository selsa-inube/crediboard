import { Stack } from "@inubekit/stack";
import { Flag } from "@inubekit/flag";
import { IUsersMessage } from "@pages/addProspect/types/users.types";

import { StyledMessageContainer } from "./styles";

interface IRenderMessageProps {
  message: IUsersMessage;
  handleCloseMessage: () => void;
  onMessageClosed: () => void;
}

const RenderMessage = (props: IRenderMessageProps) => {
  const { message } = props;

  return (
    <StyledMessageContainer>
      <Stack justifyContent="flex-end" width="100%">
        <Flag
          id="flag1"
          appearance={"success"}
          description={message.data!.description}
          duration={4000}
          title={message.data!.title}
        />
      </Stack>
    </StyledMessageContainer>
  );
};

export { RenderMessage };
export type { IRenderMessageProps };

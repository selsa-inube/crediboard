import { Stack } from "@inubekit/stack";
import { Flag } from "@inubekit/flag";
import { MdOutlineThumbUp } from "react-icons/md";
import { StyledMessageContainer } from "./styles";

interface IFlagMessageProps {
  handleCloseMessage: () => void;
  onMessageClosed: () => void;
}

const FlagMessage: React.FC<IFlagMessageProps> = ({
  handleCloseMessage,
  onMessageClosed,
}) => {


  const closeMessageAndExecuteCallback = () => {
    handleCloseMessage();
    onMessageClosed();
  };



  return (
    <>
      <StyledMessageContainer>
        <Stack justifyContent="flex-end" width="100%">
          <Flag
            appearance={"success"}
            closeFlag={closeMessageAndExecuteCallback}
            description={"Se a realizado la anulación"}
            duration={4000}
            icon={<MdOutlineThumbUp/>}
            title={"anulación"}
            isMessageResponsive={false}
          />
        </Stack>
      </StyledMessageContainer>
    </>
  );
};

export { FlagMessage };
export type { IFlagMessageProps };

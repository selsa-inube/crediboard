import { Stack } from "@inubekit/stack";
import { Flag } from "@inubekit/flag";
import { MdOutlineThumbUp } from "react-icons/md";
import { StyledMessageContainer } from "./styles";

interface IFlagMessageProps {
  title: string;
  description: string;
}

const FlagMessage: React.FC<IFlagMessageProps> = ({ title, description }) => {
  const closeSectionMessage = () => {
    console.log("SectionMessage closed");
  };

  return (
    <>
      <StyledMessageContainer>
        <Stack justifyContent="flex-end" width="100%">
          <Flag
            appearance="success"
            closeFlag={closeSectionMessage}
            description={description}
            duration={4000}
            icon={<MdOutlineThumbUp />}
            title={title}
            isMessageResponsive={false}
          />
        </Stack>
      </StyledMessageContainer>
    </>
  );
};

export { FlagMessage };
export type { IFlagMessageProps };

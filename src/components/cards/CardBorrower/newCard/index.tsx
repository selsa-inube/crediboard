import { MdAdd } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Icon } from "@inubekit/icon";
import { Text } from "@inubekit/text";

import { BorrowerTitle } from "../config";
import { StyledContainer } from "../styles";

interface INewCardBorrowerProps {
  onClick: () => void;
  isMobile?: boolean;
}

export function NewCardBorrower(props: INewCardBorrowerProps) {
  const { onClick, isMobile } = props;

  return (
    <StyledContainer $new={true} showIcons={true} onClick={onClick} $isMobile={isMobile}>
      <Stack direction="column" alignItems="center" justifyContent="center">
        <Icon icon={<MdAdd />} appearance={"gray"} size="40px" cursorHover />
        <Text type="title" size="medium" weight="bold" appearance="gray">
          {BorrowerTitle}
        </Text>
      </Stack>
    </StyledContainer>
  );
}

import { MdAdd } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Icon } from "@inubekit/icon";
import { Text } from "@inubekit/text";

import { BorrowerTitle } from "../config";
import { StyledContainer } from "../styles";

export function NewCardBorrower() {
  return (
    <StyledContainer $new={true}>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        height="368px"
      >
        <Icon icon={<MdAdd />} appearance={"gray"} size="40px" cursorHover />
        <Text type="title" size="medium" weight="bold" appearance="gray">
          {BorrowerTitle}
        </Text>
      </Stack>
    </StyledContainer>
  );
}

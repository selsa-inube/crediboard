import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";

import { StyledContainer } from "./styles";

export interface ICardBorrowerProps {
  label: string;
  placeHolder: string
}

export function CardBorrower(props: ICardBorrowerProps) {
  const { label, placeHolder } = props;

  return (
    <StyledContainer>
      <Stack direction="column" padding="10px 16px">
        <Text type="label" weight="bold" size="large">
          {label}
        </Text>
        <Text type="body" size="large">
          {placeHolder}
        </Text>
      </Stack>
    </StyledContainer>
  );
}

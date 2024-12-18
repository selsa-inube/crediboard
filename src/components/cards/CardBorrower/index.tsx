import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";

import { StyledContainer } from "./styles";

export interface ICardBorrowerProps {
  label: string;
  placeHolder?: string;
  data?: string;
}

export function CardBorrower(props: ICardBorrowerProps) {
  const { label, placeHolder, data } = props;

  return (
    <StyledContainer>
      <Stack
        justifyContent="space-between"
        alignItems="center"
        padding="10px 16px"
      >
        <Stack direction="column">
          <Text type="label" weight="bold" size="large">
            {label}
          </Text>
          <Text type="body" size="large">
            {placeHolder}
          </Text>
        </Stack>
        <Text type="body" size="medium" appearance="gray">
          {data}
        </Text>
      </Stack>
    </StyledContainer>
  );
}

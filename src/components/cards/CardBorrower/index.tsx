import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";

import { dataCardBorrower } from "./config";
import { StyledContainer } from "./styles";

export interface ICardBorrowerProps {
  name: string;
}

export function CardBorrower(props: ICardBorrowerProps) {
  const { name } = props;

  return (
    <StyledContainer>
      <Stack direction="column" padding="10px 16px">
        <Text type="label" weight="bold" size="large">
          {dataCardBorrower.borrower}
        </Text>
        <Text type="body" size="large">
          {name}
        </Text>
      </Stack>
    </StyledContainer>
  );
}

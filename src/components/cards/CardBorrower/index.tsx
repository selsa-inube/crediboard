import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";

import { StyledContainer } from "./styles";

export interface ICardBorrowerProps {
  label: string;
  placeHolder?: string;
  data?: string;
  isMobile?: boolean;
}

export function CardBorrower(props: ICardBorrowerProps) {
  const { label, placeHolder = "", data = "", isMobile } = props;

  return (
    <StyledContainer>
      <Stack
        justifyContent="space-between"
        alignItems="center"
        padding="10px 16px"
      >
        <Stack direction="column">
          <Text type="label" weight="bold" size="medium">
            {label}
          </Text>
          <Text type="body" size="large">
            {placeHolder}
          </Text>
        </Stack>
        <Text
          type="body"
          size={isMobile ? "large" : "medium"}
          appearance={isMobile ? "dark" : "gray"}
        >
          {data}
        </Text>
      </Stack>
    </StyledContainer>
  );
}

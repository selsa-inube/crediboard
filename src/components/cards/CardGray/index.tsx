import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";

import { StyledContainer } from "./styles";

export interface ICardGrayProps {
  label: string;
  placeHolder?: string;
  data?: string;
  apparencePlaceHolder?: "dark" | "gray";
  isMobile?: boolean;
}

export function CardGray(props: ICardGrayProps) {
  const {
    label,
    placeHolder = "",
    data = "",
    isMobile = false,
    apparencePlaceHolder = "dark",
  } = props;

  return (
    <StyledContainer>
      <Stack
        justifyContent="space-between"
        alignItems="center"
        padding="6px 16px"
      >
        <Stack direction="column">
          <Text type="label" weight="bold" size="medium" appearance="dark">
            {label}
          </Text>
          <Text type="body" size="medium" appearance={apparencePlaceHolder}>
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

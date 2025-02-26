import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";

import { StyledContainer } from "./styles";

export interface ICardGrayProps {
  label: string;
  placeHolder?: string;
  data?: string;
  apparencePlaceHolder?: "dark" | "gray";
  height?: string;
  isMobile?: boolean;
}

export function CardGray(props: ICardGrayProps) {
  const {
    label,
    placeHolder = "",
    data = "",
    isMobile = false,
    height = "",
    apparencePlaceHolder = "dark",
  } = props;

  return (
    <StyledContainer>
      <Stack justifyContent="space-between" padding="6px 16px" height={height}>
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

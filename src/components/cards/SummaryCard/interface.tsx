import { Stack, Text, Icon, inube } from "@inube/design-system";
import { MdOutlineMessage, MdOutlinePushPin, MdPushPin } from "react-icons/md";

import {
  truncateTextToMaxLength,
  capitalizeFirstLetter,
  capitalizeFirstLetterEachWord,
} from "@utils/formatData/text";
import { currencyFormat } from "@utils/formatData/currency";
import { formatISODatetoCustomFormat } from "@utils/formatData/date";

import { StyledSummaryCard, StyledDivider, StyledLink } from "./styles";
import { SummaryCardProps } from ".";

function SummaryCardUI(props: SummaryCardProps) {
  const {
    rad,
    date,
    name,
    destination,
    value,
    toDo,
    path,
    isPinned,
    hasMessage,
    onPinChange,
  } = props;

  return (
    <StyledSummaryCard>
      <StyledLink to={path}>
        <Stack justifyContent="space-between">
          <Text size="small" appearance="gray">
            No. Rad.:{rad}
          </Text>
          <Text size="small" appearance="gray">
            {capitalizeFirstLetter(formatISODatetoCustomFormat(date))}
          </Text>
        </Stack>
        <Text type="label">
          {capitalizeFirstLetterEachWord(truncateTextToMaxLength(name))}
        </Text>
        <Text size="medium" appearance="gray">
          Destino:
        </Text>
        <Text type="label">
          {capitalizeFirstLetter(truncateTextToMaxLength(destination, 60))}
        </Text>
        <Stack gap={inube.spacing.s100}>
          <Text size="medium" appearance="gray">
            Valor:
          </Text>
          <Text type="label">
            {value === 0 ? "$ 0" : currencyFormat(value)}
          </Text>
        </Stack>
        <Text size="medium" appearance="gray">
          Actividad en ejecución:
        </Text>
        <Text type="label">
          {capitalizeFirstLetter(truncateTextToMaxLength(toDo, 60))}
        </Text>
      </StyledLink>
      <Stack direction="column" padding="s0 s100">
        <StyledDivider />
        <Stack
          gap={inube.spacing.s100}
          justifyContent="flex-end"
          padding="s100 s0"
        >
          {hasMessage && (
            <Icon
              icon={<MdOutlineMessage />}
              appearance="dark"
              size="20px"
              cursorHover
            />
          )}
          <Icon
            icon={isPinned ? <MdPushPin /> : <MdOutlinePushPin />}
            appearance={isPinned ? "dark" : "gray"}
            size="20px"
            cursorHover
            onClick={onPinChange}
          />
        </Stack>
      </Stack>
    </StyledSummaryCard>
  );
}

export { SummaryCardUI };

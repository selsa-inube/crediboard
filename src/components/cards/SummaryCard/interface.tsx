import { Stack, Text, Icon, inube } from "@inube/design-system";
import { MdOutlineMessage, MdOutlinePushPin, MdPushPin } from "react-icons/md";

import { currencyFormat } from "@utils/formatData/currency";

import { StyledSummaryCard, StyledDivider } from "./styles";
import { SummaryCardProps } from ".";

function SummaryCardUI(props: SummaryCardProps) {
  const {
    rad,
    date,
    name,
    destination,
    value,
    toDo,
    isPinned = false,
    hasMessage = false,
    onPinChange,
  } = props;

  return (
    <StyledSummaryCard>
      <Stack
        direction="column"
        padding="s100"
        justifyContent="space-between"
        height="100%"
      >
        <Stack justifyContent="space-between">
          <Text size="small" appearance="gray">
            No. Rad.:{rad}
          </Text>
          <Text size="small" appearance="gray">
            {date}
          </Text>
        </Stack>
        <Text type="label">{name}</Text>
        <Text size="medium" appearance="gray">
          Destino:
        </Text>
        <Text type="label">{destination}</Text>
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
        <Text type="label">{toDo}</Text>
        <Stack direction="column" gap={inube.spacing.s075}>
          <StyledDivider />
          <Stack gap={inube.spacing.s100} justifyContent="flex-end">
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
      </Stack>
    </StyledSummaryCard>
  );
}

export { SummaryCardUI };

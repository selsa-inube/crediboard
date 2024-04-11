import { Stack, Text, Icon, inube } from "@inube/design-system";
import { MdOutlineMessage, MdOutlinePushPin } from "react-icons/md";

import { currencyFormat } from "@utils/formatData/currency";
import { truncateTextToMaxLength } from "@utils/formatData/text";

import { StyledSummaryCard, StyledDivider } from "./styles";

interface ISummaryCardProps {
  rad: number;
  date: string;
  name: string;
  destination: string;
  value: number;
  toDo: string;
  isPinned?: boolean;
  hasMessage?: boolean;
}

function SummaryCard(props: ISummaryCardProps) {
  const { rad, date, name, destination, value, toDo, isPinned, hasMessage } =
    props;
  return (
    <StyledSummaryCard>
      <Stack direction="column" padding="s100" gap={inube.spacing.s075}>
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
        <Text type="label">{truncateTextToMaxLength(destination)}</Text>
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
        <Text type="label">{truncateTextToMaxLength(toDo)}</Text>
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
          {isPinned && (
            <Icon
              icon={<MdOutlinePushPin />}
              appearance="dark"
              size="20px"
              cursorHover
            />
          )}
        </Stack>
      </Stack>
    </StyledSummaryCard>
  );
}

export { SummaryCard };
export type { ISummaryCardProps };

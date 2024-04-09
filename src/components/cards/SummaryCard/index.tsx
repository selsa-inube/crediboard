import { StyledSummaryCard } from "./styles";
import { Stack, Text, Icon } from "@inube/design-system";
import { StyledDivider } from "./styles";
import { MdOutlineMessage, MdOutlinePushPin } from "react-icons/md";
import { currencyFormat } from "@src/mocks/utils/formatData/currency";
import { truncateTextToMaxLength } from "@src/mocks/utils/formatData/text";

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
      <Stack direction="column" padding="s100" gap="7px">
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
        <Stack gap="8px">
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
        <Stack gap="8px" justifyContent="flex-end">
          {hasMessage && (
            <Icon
              icon={<MdOutlineMessage />}
              appearance="dark"
              size="19px"
              cursorHover
            />
          )}
          {isPinned && (
            <Icon
              icon={<MdOutlinePushPin />}
              appearance="dark"
              size="19px"
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

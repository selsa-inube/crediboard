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
          <Text type="body" size="small" appearance="gray">
            No. Rad.:{rad}
          </Text>
          <Text type="body" size="small" appearance="gray">
            {date}
          </Text>
        </Stack>
        <Text type="body" size="medium">
          {name}
        </Text>
        <Text type="body" size="medium" appearance="gray">
          Destino:
        </Text>
        <Text type="body" size="medium">
          {truncateTextToMaxLength(destination)}
        </Text>
        <Stack gap="8px">
          <Text type="body" size="medium" appearance="gray">
            Valor:
          </Text>
          <Text type="body" size="medium">
            {currencyFormat(value)}
          </Text>
        </Stack>
        <Text type="body" size="medium" appearance="gray">
          Actividad en ejecución:
        </Text>
        <Text type="body" size="medium">
          {truncateTextToMaxLength(toDo)}
        </Text>
        <StyledDivider />
        <Stack gap="8px" justifyContent="flex-end">
          {hasMessage && (
            <Icon icon={<MdOutlineMessage />} appearance="dark" cursorHover />
          )}
          {isPinned && (
            <Icon icon={<MdOutlinePushPin />} appearance="dark" cursorHover />
          )}
        </Stack>
      </Stack>
    </StyledSummaryCard>
  );
}

export { SummaryCard };
export type { ISummaryCardProps };

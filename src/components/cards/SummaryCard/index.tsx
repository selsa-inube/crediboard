import { Stack, Text, Icon, inube } from "@inube/design-system";
import { MdOutlineMessage, MdOutlinePushPin } from "react-icons/md";

import { currencyFormat } from "@utils/formatData/currency";
import {
  truncateTextToMaxLength,
  capitalizeFirstLetter,
  capitalizeFirstLetterEachWord,
} from "@utils/formatData/text";

import { StyledSummaryCard, StyledDivider, StyledLink } from "./styles";

interface ISummaryCardProps {
  rad: number;
  date: string;
  name: string;
  destination: string;
  value: number;
  toDo: string;
  path?: string;
  isPinned?: boolean;
  hasMessage?: boolean;
}

function SummaryCard(props: ISummaryCardProps) {
  const {
    rad,
    date,
    name,
    destination,
    value,
    toDo,
    path = "#",
    isPinned = false,
    hasMessage = false,
  } = props;
  return (
    <StyledSummaryCard>
      <StyledLink to={path}>
        <Stack justifyContent="space-between">
          <Text size="small" appearance="gray">
            No. Rad.:{rad}
          </Text>
          <Text size="small" appearance="gray">
            {date}
          </Text>
        </Stack>
        <Text type="label">{capitalizeFirstLetterEachWord(name)}</Text>
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

import { PiSealCheckBold } from "react-icons/pi";
import { inube, Stack, Text } from "@inube/design-system";

import { CardInfoContainer } from "@components/cards/CardInfoContainer";
import { StyledDivider } from "@components/cards/SummaryCard/styles";

interface GuaranteesProps {
  guaranteesRequired: string;
  guaranteesOffered: string;
  guaranteesCurrent: string;
}

export function Guarantees(props: GuaranteesProps) {
  const { guaranteesRequired, guaranteesOffered, guaranteesCurrent } = props;
  return (
    <CardInfoContainer
      title="Garantías"
      icon={<PiSealCheckBold />}
      heightCardInfoContainer="246px"
    >
      <Stack direction="column" gap={inube.spacing.s150}>
        <Stack direction="column">
          <Text size="medium">Requeridas:</Text>
          <Text appearance="primary" type="title" size="medium">
            {guaranteesRequired}
          </Text>
        </Stack>
        <StyledDivider />
        <Stack direction="column">
          <Text size="medium">Ofrecidas:</Text>
          <Text appearance="primary" type="title" size="medium">
            {guaranteesOffered}
          </Text>
        </Stack>
        <StyledDivider />
        <Stack direction="column">
          <Text size="medium">Vigentes:</Text>
          <Text appearance="primary" type="title" size="medium">
            {guaranteesCurrent}
          </Text>
        </Stack>
      </Stack>
    </CardInfoContainer>
  );
}

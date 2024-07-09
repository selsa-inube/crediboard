import { PiSealCheckBold } from "react-icons/pi";
import { inube, Stack, Text } from "@inube/design-system";

import { CardInfoContainer } from "@components/cards/CardInfoContainer";
import { StyledDivider } from "@components/cards/SummaryCard/styles";

interface GuaranteesProps {
  guaranteesRequired: string;
  guaranteesOffered: string;
  guaranteesCurrent: string;
  isMobile?: boolean;
}

export function Guarantees(props: GuaranteesProps) {
  const { guaranteesRequired, guaranteesOffered, guaranteesCurrent, isMobile } =
    props;
  return (
    <CardInfoContainer
      title="Garantías"
      icon={<PiSealCheckBold />}
      heightCardInfoContainer={isMobile ? "196px" : "246px"}
      isMobile={isMobile}
    >
      <Stack
        direction="column"
        gap={isMobile ? inube.spacing.s100 : inube.spacing.s150}
      >
        <Stack direction="column">
          <Text size={isMobile ? "small" : "medium"}>Requeridas:</Text>
          <Text
            appearance="primary"
            type="title"
            size={isMobile ? "small" : "medium"}
          >
            {guaranteesRequired}
          </Text>
        </Stack>
        <StyledDivider />
        <Stack direction="column">
          <Text size={isMobile ? "small" : "medium"}>Ofrecidas:</Text>
          <Text
            appearance="primary"
            type="title"
            size={isMobile ? "small" : "medium"}
          >
            {guaranteesOffered}
          </Text>
        </Stack>
        <StyledDivider />
        <Stack direction="column">
          <Text size={isMobile ? "small" : "medium"}>Vigentes:</Text>
          <Text
            appearance="primary"
            type="title"
            size={isMobile ? "small" : "medium"}
          >
            {guaranteesCurrent}
          </Text>
        </Stack>
      </Stack>
    </CardInfoContainer>
  );
}

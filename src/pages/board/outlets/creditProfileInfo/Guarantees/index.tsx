import { PiSealCheckBold } from "react-icons/pi";
import { Text } from "@inubekit/text";
import { Stack } from "@inubekit/stack";

import { CardInfoContainer } from "@components/cards/CardInfoContainer";
import { StyledDivider } from "@components/cards/SummaryCard/styles";
import { ItemNotFound } from "@components/layout/ItemNotFound";
import userNotFound from "@assets/images/ItemNotFound.png";

interface GuaranteesProps {
  guaranteesRequired: string;
  guaranteesOffered: string;
  guaranteesCurrent: string;
  isMobile?: boolean;
  dataWereObtained: boolean;
}

export function Guarantees(props: GuaranteesProps) {
  const {
    guaranteesRequired,
    guaranteesOffered,
    guaranteesCurrent,
    isMobile,
    dataWereObtained,
  } = props;


  return (
    <CardInfoContainer
      title="Garantías"
      icon={<PiSealCheckBold />}
      isMobile={isMobile}
    >
      {dataWereObtained ? (
        <ItemNotFound
          image={userNotFound}
          title="Datos no encontrados"
          description="No pudimos obtener los datos solicitados."
          buttonDescription="Reintentar"
          route="#"
        />
      ) : (
        <Stack direction="column" gap={isMobile ? "8px" : "12px"}>
          <Stack direction="column">
            <Text size={isMobile ? "small" : "medium"}>Requeridas:</Text>
            <Text
              appearance="primary"
              type="title"
              size={isMobile ? "small" : "medium"}
              weight="bold"
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
              weight="bold"
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
              weight="bold"
            >
              {guaranteesCurrent}
            </Text>
          </Stack>
        </Stack>
      )}
    </CardInfoContainer>
  );
}

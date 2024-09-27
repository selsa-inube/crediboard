import { useState, useEffect } from "react";
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

  const [errorOccurred, setErrorOccurred] = useState<boolean>(dataWereObtained);

  const handleRetry = () => {
    setErrorOccurred(false);
  };

  useEffect(() => {
    setErrorOccurred(dataWereObtained);
  }, [dataWereObtained]);


  return (
    <CardInfoContainer
      title="Garantías"
      icon={<PiSealCheckBold />}
      isMobile={isMobile}
    >
      {errorOccurred ? (
        <ItemNotFound
          image={userNotFound}
          title="Datos no encontrados"
          description="No pudimos obtener los datos solicitados."
          buttonDescription="Reintentar"
          route="#"
          onRetry={handleRetry}
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

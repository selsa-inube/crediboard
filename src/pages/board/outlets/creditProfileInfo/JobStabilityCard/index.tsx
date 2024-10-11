import { MdOutlineBusinessCenter } from "react-icons/md";
import { Text } from "@inubekit/text";
import { Stack } from "@inubekit/stack";

import { CardInfoContainer } from "@components/cards/CardInfoContainer";
import { StyledDivider } from "@components/cards/SummaryCard/styles";
import { currencyFormat } from "@utils/formatData/currency";
import { ItemNotFound } from "@components/layout/ItemNotFound";
import userNotFound from "@assets/images/ItemNotFound.png";

interface JobStabilityCardProps {
  companySeniority: number;
  stabilityIndex: number;
  estimatedCompensation: number;
  isMobile?: boolean;
  dataCreditProfile: boolean;
  setCreditProfile: (stade: boolean) => void;
}

export function JobStabilityCard(props: JobStabilityCardProps) {
  const {
    companySeniority,
    stabilityIndex,
    estimatedCompensation,
    isMobile,
    dataCreditProfile,
    setCreditProfile,
  } = props;

  const handleRetry = () => {
    setCreditProfile(false);
  };
  
  return (
    <CardInfoContainer
      title="Estabilidad Laboral"
      icon={<MdOutlineBusinessCenter />}
      isMobile={isMobile}
    >
      {dataCreditProfile ? (
        <ItemNotFound
          image={userNotFound}
          title="Datos no encontrados"
          description="No pudimos obtener los datos solicitados."
          buttonDescription="Reintentar"
          route="#"
          onRetry={handleRetry}
        />
      ) : (
        <Stack direction="column" gap={isMobile ? "6px" : "16px"}>
          <Stack alignItems="center" gap="32px">
            <Stack width={isMobile ? "110px" : "170px"}>
              <Text size={isMobile ? "small" : "medium"}>
                Antigüedad en la empresa
              </Text>
            </Stack>
            <Stack>
              <Text
                appearance="primary"
                type="headline"
                size={isMobile ? "small" : "medium"}
              >
                {companySeniority} años
              </Text>
            </Stack>
          </Stack>
          <StyledDivider />
          <Stack alignItems="center" gap="32px">
            <Stack width={isMobile ? "110px" : "170px"}>
              <Text size={isMobile ? "small" : "medium"}>
                Indice de estabilidad laboral
              </Text>
            </Stack>
            <Stack>
              <Stack alignItems="center" gap="8px">
                <Text
                  appearance="primary"
                  type="headline"
                  size={isMobile ? "small" : "medium"}
                >
                  {stabilityIndex}
                </Text>
                <Text size={isMobile ? "small" : "medium"}>/1000</Text>
              </Stack>
            </Stack>
          </Stack>
          <StyledDivider />
          <Stack alignItems="center" gap="32px">
            <Stack width={isMobile ? "110px" : "170px"}>
              <Text size={isMobile ? "small" : "medium"}>
                Indemnización estimada
              </Text>
            </Stack>
            <Stack>
              <Text
                appearance="primary"
                type="headline"
                size={isMobile ? "small" : "medium"}
              >
                {estimatedCompensation === 0
                  ? "$ 0"
                  : currencyFormat(estimatedCompensation)}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      )}
    </CardInfoContainer>
  );
}

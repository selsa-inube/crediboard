import { createPortal } from "react-dom";
import { MdClear, MdQueryStats } from "react-icons/md";
import { useMediaQuery } from "@inubekit/hooks";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { Blanket } from "@inubekit/blanket";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { Textfield } from "@inubekit/textfield";
import { currencyFormat } from "@utils/formatData/currency";

import { StyledContainerClose, StyledModal, StyledDivider } from "./styles";

export interface ScoreModalProps {
  title: string;
  handleClose: () => void;
  portalId?: string;
  puntajeTotal: number;
  antiguedad: number;
  riesgoCentral: number;
  estabilidadLaboral: number;
  estadoCivil: string;
  actividadEconomica: number;
  ingresoMensual: number;
  maxIndebtedness: string;
}

export const ScoreModal = (props: ScoreModalProps) => {
  const {
    title,
    portalId,
    handleClose,
    puntajeTotal,
    antiguedad,
    riesgoCentral,
    estabilidadLaboral,
    estadoCivil,
    actividadEconomica,
    ingresoMensual,
    maxIndebtedness,
  } = props;

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error("Portal node not found.");
  }

  const isMobile = useMediaQuery("(max-width: 700px)");

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack justifyContent="space-between" alignItems="center">
          <Text type="headline" size="medium" appearance="dark">
            {title}
          </Text>
          <StyledContainerClose onClick={handleClose}>
            <Stack alignItems="center" gap="5px">
              <Text>Cerrar</Text>
              <Icon
                icon={<MdClear />}
                size="24px"
                cursorHover
                appearance="dark"
              />
            </Stack>
          </StyledContainerClose>
        </Stack>

        <StyledDivider />

        <Stack direction="column" gap="16px">
          <Stack direction="column" gap="8px">
            <Stack gap="8px" alignItems="center">
              <Icon
                appearance="primary"
                icon={<MdQueryStats />}
                disabled={false}
                size="34px"
              />
              <Text appearance="primary" size="large" type="title">
                Score de riesgo
              </Text>
            </Stack>

            <StyledDivider />

            <Stack justifyContent="space-between">
              <Text appearance="dark" weight="bold">
                Puntaje total
              </Text>
              <Text>{puntajeTotal}/200</Text>
            </Stack>

            <StyledDivider />
            
            <Stack justifyContent="space-between">
              <Text>Antigüedad de 10 años</Text>
              <Text>{antiguedad}/200</Text>
            </Stack>

            <Stack justifyContent="space-between">
              <Text>Central de riesgo de 250 P</Text>
              <Text>{riesgoCentral}/200</Text>
            </Stack>

            <Stack justifyContent="space-between">
              <Text>Índice de estabilidad laboral 900 P</Text>
              <Text>{estabilidadLaboral}/300</Text>
            </Stack>

            <Stack justifyContent="space-between">
              <Text>Estado civil - {estadoCivil}</Text>
              <Text>50/50</Text>
            </Stack>

            <Stack justifyContent="space-between">
              <Text>Actividad económica</Text>
              <Text>{actividadEconomica}/200</Text>
            </Stack>
          </Stack>

          <StyledDivider />

          <Stack justifyContent="space-between">
            <Text>No. de veces el ingreso para este scoring</Text>
            <Text>5</Text>
          </Stack>
          <Stack justifyContent="space-between">
            <Text>Ingresos mensuales</Text>
            <Text>{currencyFormat(ingresoMensual)}</Text>
          </Stack>
          
          <StyledDivider />

          <Textfield
            value={maxIndebtedness}
            fullwidth={true}
            id="id"
            label="Endeudamiento máximo"
            name="name"
            placeholder="Ingrese la cantidad"
          />
        </Stack>

        <StyledDivider />

        <Stack gap="8px" justifyContent="end">
          <Button
            onClick={handleClose}
            appearance="primary"
            fullwidth={isMobile}
          >
            Cerrar
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node
  );
};

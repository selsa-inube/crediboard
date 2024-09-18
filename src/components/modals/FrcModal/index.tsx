import { createPortal } from "react-dom";
import { MdClear, MdQueryStats, MdOutlineAttachMoney } from "react-icons/md";
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
  EstadoCivil: number;
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
    EstadoCivil,
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
          <Text type="headline" size="small" appearance="dark">
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
              <Text appearance="dark" size="large" weight="bold">
                Puntaje total
              </Text>
              <Stack>
                <Text appearance="primary" weight="bold">
                  {puntajeTotal}
                </Text>
                <Text>/200</Text>
              </Stack>
            </Stack>

            <StyledDivider />

            <Stack justifyContent="space-between">
              <Text weight="bold" size="large">
                Antigüedad de 10 años
              </Text>
              <Stack>
                <Text appearance="primary" weight="bold">
                  {antiguedad}
                </Text>
                <Text>/200</Text>
              </Stack>
            </Stack>

            <Stack justifyContent="space-between">
              <Text weight="bold" size="large">
                Central de riesgo de 250 P
              </Text>
              <Stack>
                <Text appearance="primary" weight="bold">
                  {riesgoCentral}
                </Text>
                <Text>/200</Text>
              </Stack>
            </Stack>

            <Stack justifyContent="space-between">
              <Text weight="bold" size="large">
                Índice de estabilidad laboral 900 P
              </Text>
              <Stack>
                <Text appearance="primary" weight="bold">
                  {estabilidadLaboral}
                </Text>
                <Text>/300</Text>
              </Stack>
            </Stack>

            <Stack justifyContent="space-between">
              <Text weight="bold" size="large">
                Estado civil
              </Text>
              <Stack>
                <Text appearance="primary" weight="bold">
                  {EstadoCivil}
                </Text>
                <Text>/50</Text>
              </Stack>
            </Stack>

            <Stack justifyContent="space-between">
              <Text weight="bold" size="large">
                Actividad económica
              </Text>
              <Stack>
                <Text appearance="primary" weight="bold">
                  {actividadEconomica}
                </Text>
                <Text>/200</Text>
              </Stack>
            </Stack>
          </Stack>

          <StyledDivider />

          <Stack justifyContent="space-between">
            <Text weight="bold" size="large">
              No. de veces el ingreso para este scoring
            </Text>
            <Text>5</Text>
          </Stack>
          <Stack justifyContent="space-between">
            <Text weight="bold" size="large">
              Ingresos mensuales
            </Text>
            <Stack>
              <Text appearance="success">$</Text>
              <Text>{currencyFormat(ingresoMensual, false)}</Text>
            </Stack>
          </Stack>

          <StyledDivider />

          <Textfield
            value={maxIndebtedness}
            iconBefore={<MdOutlineAttachMoney />}
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

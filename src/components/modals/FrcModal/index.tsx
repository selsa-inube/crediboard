import { createPortal } from "react-dom";
import { MdClear, MdQueryStats, MdOutlineAttachMoney } from "react-icons/md";
import { useMediaQuery } from "@inubekit/hooks";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { Blanket } from "@inubekit/blanket";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { Textfield } from "@inubekit/textfield";
import { Divider } from "@inubekit/divider";
import { currencyFormat } from "@utils/formatData/currency";

import { StyledContainerClose, StyledModal } from "./styles";

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

        <Divider />

        <Stack direction="column" gap="16px">
          <Stack direction="column" gap="12px">
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

            <Divider />

            <Stack justifyContent="space-between" alignItems="center">
              <Text appearance="dark" size="large" weight="bold" type="label">
                Puntaje total
              </Text>
              <Stack>
                <Text
                  appearance="primary"
                  weight="bold"
                  type="body"
                  size="large"
                >
                  {puntajeTotal}
                </Text>
                <Text weight="bold" type="body" size="large">
                  /200
                </Text>
              </Stack>
            </Stack>

            <Divider />

            <Stack justifyContent="space-between" alignItems="center">
              <Text weight="bold" size="large" type="label">
                Antigüedad de 10 años
              </Text>
              <Stack>
                <Text appearance="primary" weight="bold" size="large">
                  {antiguedad}
                </Text>
                <Text weight="bold" type="body" size="large">
                  /200
                </Text>
              </Stack>
            </Stack>

            <Stack justifyContent="space-between" alignItems="center">
              <Text weight="bold" size="large" type="label">
                Central de riesgo de 250 P
              </Text>
              <Stack>
                <Text appearance="primary" weight="bold" size="large">
                  {riesgoCentral}
                </Text>
                <Text weight="bold" type="body" size="large">
                  /200
                </Text>
              </Stack>
            </Stack>

            <Stack justifyContent="space-between" alignItems="center">
              <Text weight="bold" size="large" type="label">
                Índice de estabilidad laboral 900 P
              </Text>
              <Stack>
                <Text appearance="primary" weight="bold" size="large">
                  {estabilidadLaboral}
                </Text>
                <Text weight="bold" type="body" size="large">
                  /300
                </Text>
              </Stack>
            </Stack>

            <Stack justifyContent="space-between" alignItems="center">
              <Text weight="bold" size="large" type="label">
                Estado civil
              </Text>
              <Stack>
                <Text appearance="primary" weight="bold" size="large">
                  {EstadoCivil}
                </Text>
                <Text weight="bold" type="body" size="large">
                  /50
                </Text>
              </Stack>
            </Stack>

            <Stack justifyContent="space-between" alignItems="center">
              <Text weight="bold" size="large" type="label">
                Actividad económica
              </Text>
              <Stack>
                <Text appearance="primary" weight="bold" size="large">
                  {actividadEconomica}
                </Text>
                <Text weight="bold" type="body" size="large">
                  /200
                </Text>
              </Stack>
            </Stack>
          </Stack>

          <Divider />

          <Stack justifyContent="space-between" alignItems="center">
            <Text weight="bold" size="large" type="label">
              No. de veces el ingreso para este scoring
            </Text>
            <Text weight="bold" type="body" size="large">
              5
            </Text>
          </Stack>
          <Stack justifyContent="space-between">
            <Text weight="bold" size="large" type="label">
              Ingresos mensuales
            </Text>
            <Stack>
              <Text appearance="success">$</Text>
              <Text>{currencyFormat(ingresoMensual, false)}</Text>
            </Stack>
          </Stack>

          <Divider />

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

        <Divider />

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

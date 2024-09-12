import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  MdClear,
  MdOutlineVisibility,
  MdInfoOutline,
  MdOutlineAttachMoney,
  MdErrorOutline,
} from "react-icons/md";
import { useMediaQuery } from "@inubekit/hooks";
import { inube } from "@inubekit/foundations";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { Blanket } from "@inubekit/blanket";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { Textfield } from "@inubekit/textfield";
import { SkeletonLine } from "@inubekit/skeleton";

import { currencyFormat } from "@utils/formatData/currency";

import { StyledContainerClose, StyledModal, StyledDivider } from "./styles";

export interface IncomeModalProps {
  title: string;
  handleClose: () => void;
  portalId?: string;
  reportedIncomeSources: number;
  reportedFinancialObligations: number;
  subsistenceReserve: number;
  availableForNewCommitments: number;
  maxVacationTerm: number;
  maxAmount: number;
}

export const IncomeModal = (props: IncomeModalProps) => {
  const {
    title,
    portalId,
    handleClose,
    reportedIncomeSources,
    reportedFinancialObligations,
    subsistenceReserve,
    availableForNewCommitments,
    maxVacationTerm,
    maxAmount,
  } = props;

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error(
      "The portal node is not defined. Ensure the portal has been set correctly."
    );
  }

  const isMobile = useMediaQuery("(max-width: 700px)");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setError(false);
      setLoading(false);
    }, 2000);
  }, []);

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack justifyContent="space-between">
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

        {error ? (
          <Stack direction="column" alignItems="center" padding="16px">
            <Icon icon={<MdErrorOutline />} size="32px" appearance="danger" />
            <Text size="large" weight="bold" appearance="danger">
              Error cargando datos
            </Text>
            <Text size="small" appearance="dark" textAlign="center">
              No se pudieron cargar los datos. Por favor, intente nuevamente más
              tarde.
            </Text>
          </Stack>
        ) : (
          <Stack direction="column">
            <Stack padding="8px 0px" justifyContent="space-between">
              <Text appearance="dark" size="large" weight="bold">
                Total fuentes de ingreso reportadas
              </Text>

              <Stack alignItems="center">
                <Text appearance="success">$</Text>
                {loading ? (
                  <SkeletonLine width="70px" animated={true} />
                ) : (
                  <Text>{currencyFormat(reportedIncomeSources, false)}</Text>
                )}
                <Stack margin="0px 0px 0px 5px">
                  <Icon
                    appearance="primary"
                    icon={<MdOutlineVisibility />}
                    size="16px"
                    spacing="none"
                    cursorHover
                    variant="filled"
                    shape="circle"
                  />
                </Stack>
              </Stack>
            </Stack>

            <Stack padding="8px 0px" justifyContent="space-between">
              <Text appearance="gray" size="large" weight="bold">
                (-) Obligaciones financieras reportadas
              </Text>

              <Stack alignItems="center">
                <Text appearance="success">$</Text>
                {loading ? (
                  <SkeletonLine width="70px" animated={true} />
                ) : (
                  <Text>
                    {currencyFormat(reportedFinancialObligations, false)}
                  </Text>
                )}
                <Stack margin="0px 0px 0px 5px">
                  <Icon
                    appearance="primary"
                    icon={<MdOutlineVisibility />}
                    size="16px"
                    spacing="none"
                    cursorHover
                    variant="filled"
                    shape="circle"
                  />
                </Stack>
              </Stack>
            </Stack>

            <Stack padding="8px 0px" justifyContent="space-between">
              <Text appearance="gray" size="large" weight="bold">
                (-) Reserva mínima de subsistencia
              </Text>

              <Stack alignItems="center">
                <Text appearance="success">$</Text>
                {loading ? (
                  <SkeletonLine width="70px" animated={true} />
                ) : (
                  <Text>{currencyFormat(subsistenceReserve, false)}</Text>
                )}
              </Stack>
            </Stack>

            <StyledDivider />

            <Stack padding="8px 0px" justifyContent="space-between">
              <Text appearance="dark" size="large" weight="bold">
                Neto disponible para nuevos compromisos
              </Text>

              <Stack>
                <Text appearance="success">$</Text>
                {loading ? (
                  <SkeletonLine width="70px" animated={true} />
                ) : (
                  <Text>
                    {currencyFormat(availableForNewCommitments, false)}
                  </Text>
                )}
              </Stack>
            </Stack>

            <Stack padding="8px 0px" justifyContent="space-between">
              <Text appearance="dark" size="large" weight="bold">
                Plazo máx. en ‘vacaciones’
              </Text>

              {loading ? (
                <SkeletonLine width="70px" animated={true} />
              ) : (
                <Text>{maxVacationTerm}</Text>
              )}
            </Stack>

            <StyledDivider />

            <Stack alignItems="center" margin="10px 0px">
              <Icon
                appearance="primary"
                icon={<MdInfoOutline />}
                size="16px"
                spacing="none"
              />
              <Text margin="5px" size="small">
                Monto máximo calculado para una cuota de{" "}
                <strong>$1'500.000</strong> y plazo de <strong>60 meses</strong>
                .
              </Text>
            </Stack>

            <Stack padding="8px 0px" justifyContent="space-between">
              <Textfield
                value={
                  loading ? "loading..." : currencyFormat(maxAmount, false)
                }
                iconBefore={
                  <MdOutlineAttachMoney
                    color={inube.icon.dark.content.color.regular}
                  />
                }
                fullwidth={true}
                id="id"
                label="Monto máximo"
                name="name"
                placeholder="Ingrese la cantidad"
                disabled={loading}
              />
            </Stack>
          </Stack>
        )}

        <StyledDivider />

        <Stack gap="8px" justifyContent="end">
          <Button
            onClick={handleClose}
            variant="outlined"
            appearance="gray"
            fullwidth={isMobile}
          >
            Cerrar
          </Button>
          <Button
            onClick={() => alert("Recalculando...")}
            variant="filled"
            appearance="primary"
            fullwidth={isMobile}
          >
            Recalcular
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node
  );
};

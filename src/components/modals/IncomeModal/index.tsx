import { createPortal } from "react-dom";
import { MdClear, MdOutlineVisibility, MdInfoOutline } from "react-icons/md";
import { useMediaQuery } from "@inubekit/hooks";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { Blanket } from "@inubekit/blanket";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { Textfield } from "@inubekit/textfield";

import { currencyFormat } from "@utils/formatData/currency";

import {
  StyledContainerClose,
  StyledModal,
  StyledDivider,
  StyledList,
} from "./styles";

export interface IIncomeModalProps {
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

export const IncomeModal = (props: IIncomeModalProps) => {
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
        <Stack direction="column">
          <StyledList>
              <Stack padding="10px 0px" justifyContent="space-between">
                <Text appearance="dark" size="large" weight="bold">
                  Total fuentes de ingreso reportadas
                </Text>

                <Stack alignItems="center">
                  <Text appearance="success">$</Text>
                  <Text>{currencyFormat(reportedIncomeSources, false)}</Text>
                  <Stack margin="0px 0px 0px 5px">
                    <Icon
                      appearance="primary"
                      icon={<MdOutlineVisibility />}
                      size="16px"
                      spacing="none"
                      cursorHover={true}
                      variant="filled"
                      shape="circle"
                    />
                  </Stack>
                </Stack>
              </Stack>

              <Stack padding="10px 0px" justifyContent="space-between">
                <Text appearance="dark" size="large" weight="bold">
                  (-) Obligaciones financieras reportadas
                </Text>

                <Stack alignItems="center">
                  <Text appearance="success">$</Text>
                  <Text>
                    {currencyFormat(reportedFinancialObligations, false)}
                  </Text>
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

              <Stack padding="10px 0px" justifyContent="space-between">
                <Text appearance="dark" size="large" weight="bold">
                  (-) Reserva mínima de subsistencia
                </Text>

                <Stack alignItems="center">
                  <Text appearance="success">$</Text>
                  <Text>{currencyFormat(subsistenceReserve, false)}</Text>
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

              <Stack padding="10px 0px" justifyContent="space-between">
                <Text appearance="dark" size="large" weight="bold">
                  Neto disponible para nuevos compromisos
                </Text>
                <Stack>
                  <Text appearance="success">$</Text>
                  <Text weight="bold">
                    {currencyFormat(availableForNewCommitments, false)}
                  </Text>
                </Stack>
              </Stack>

              <Stack padding="10px 0px" justifyContent="space-between">
                <Text appearance="dark" size="large" weight="bold">
                  Plazo máx. en ‘vacaciones’
                </Text>
                <Text weight="bold">{maxVacationTerm}</Text>
              </Stack>
          </StyledList>

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
              <strong>$1'500.000</strong> y plazo de <strong>60 meses</strong>.
            </Text>
          </Stack>

          <Stack padding="10px 0px" justifyContent="space-between">
            <Text weight="bold">Monto máximo</Text>
            <Textfield
              value={currencyFormat(maxAmount, false)}
              disabled={false}
              fullwidth={false}
              id="id"
              label="Label"
              name="name"
              placeholder="Placeholder"
              required={false}
              size="wide"
            />
          </Stack>
        </Stack>

        <StyledDivider />

        {/* Modal Footer */}
        <Stack justifyContent="space-between">
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

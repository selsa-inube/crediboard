import { createPortal } from "react-dom";
import { MdClear, MdOutlineAttachMoney } from "react-icons/md";

import { Divider } from "@inubekit/divider";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Textfield } from "@inubekit/textfield";
import { useMediaQuery } from "@inubekit/hooks";
import { Grid } from "@inubekit/grid";
import { Button } from "@inubekit/button";
import { Icon } from "@inubekit/icon";
import { Select } from "@inubekit/select";
import { Blanket } from "@inubekit/blanket";
import { inube } from "@inubekit/foundations";

import {
  IncomeEmployment,
  IncomeCapital,
  MicroBusinesses,
  ProfessionalServices,
} from "./config"
import { StyledContainer, StyledContainerClose, StyledIncome } from "./styles";

interface IncomeModalProps {
  form: { deudor: string };
  onChange: (name: string, newValue: string) => void;
  options: { id: string; label: string; value: string }[];
  portalId?: string;
  handleClose: () => void;
}

export function IncomeModal(props: IncomeModalProps) {
  const { form, onChange, options, portalId, handleClose } = props;

  const isMobile = useMediaQuery("(max-width:880px)");

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  return createPortal(
    <Blanket>
      <StyledContainer>
        <Stack
          direction="column"
          padding="24px"
          width={!isMobile ? "1050px" : "auto"}
          height={!isMobile ? "950px" : "auto"}
          gap="24px"
        >
          <Stack justifyContent="space-between" alignItems="center">
            <Text size="small" type="headline">
              Fuentes de ingreso
            </Text>
            <StyledContainerClose onClick={handleClose}>
              <Stack alignItems="center" gap="8px">
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
          <StyledIncome>
            <Stack direction="column" height={!isMobile ? "746px" : "auto"}>
              <Grid
                templateColumns={!isMobile ? "repeat(2,1fr)" : "1fr"}
                gap="24px"
                autoRows="auto"
              >
                <IncomeEmployment />
                <ProfessionalServices />
                <IncomeCapital />
                <MicroBusinesses />
              </Grid>
            </Stack>
          </StyledIncome>
          <Divider />
          <Stack
            padding="10px 0px"
            justifyContent="space-between"
            alignItems={!isMobile ? "end" : "start"}
            direction={!isMobile ? "row" : "column"}
            gap="20px"
          >
            <Stack
              justifyContent="space-between"
              width={!isMobile ? "48.5%" : "100%"}
              gap="15px"
              direction={!isMobile ? "row" : "column"}
            >
              <Select
                id="income"
                name="deudor"
                label="Deudor"
                placeholder="Seleccione una opción"
                options={options}
                value={form.deudor}
                onChange={(name, value) => onChange(name, value)}
                size="compact"
                fullwidth
              />
              <Textfield
                id="field1"
                iconBefore={
                  <MdOutlineAttachMoney
                    color={inube.icon.dark.content.color.regular}
                  />
                }
                label="Total ingresos mensuales"
                placeholder="0"
                size="compact"
                type="number"
                fullwidth
              />
            </Stack>
            <Stack
              justifyContent="end"
              gap="15px"
              margin={!isMobile ? "none" : "15px 0px"}
              width={!isMobile ? "auto" : "100%"}
            >
              <Button
                children="Cerrar"
                appearance="gray"
                variant="outlined"
                onClick={handleClose}
              />
              <Button children="Guardar" appearance="primary" disabled />
            </Stack>
          </Stack>
        </Stack>
      </StyledContainer>
    </Blanket>,
    node
  );
}

export type { IncomeModalProps };

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import { Divider } from "@inubekit/divider";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { useMediaQuery } from "@inubekit/hooks";
import { Grid } from "@inubekit/grid";
import { Button } from "@inubekit/button";
import { Icon } from "@inubekit/icon";
import { Select } from "@inubekit/select";
import { Blanket } from "@inubekit/blanket";
import { IncomeEmployment, IncomeCapital, MicroBusinesses } from "./config";
import { StyledContainer, StyledContainerClose } from "./styles";

interface IncomeModalProps {
  form: {
    deudor: string;
    salarioMensual?: number;
    otrosPagos?: number;
    mesadaPensional?: number;
    serviciosProfesionales?: number;
    arrendamientos?: number;
    dividendos?: number;
    rendimientosFinancieros?: number;
    gananciaPromedio?: number;
    total?: number;
  };
  onChange: (name: string, newValue: string) => void;
  options: { id: string; label: string; value: string }[];
  portalId?: string;
  handleClose: () => void;
}

export function IncomeModal(props: IncomeModalProps) {
  const { form, onChange, options, portalId, handleClose } = props;

  const [isFormComplete, setIsFormComplete] = useState(false);

  const handleFieldChange = (
    fields: string[],
    index: number,
    newValue: string
  ) => {
    const field = fields[index];
    if (field) {
      onChange(field, newValue);
    }
  };

  useEffect(() => {
    const allFieldsFilled = [
      form.deudor,
      form.salarioMensual,
      form.otrosPagos,
      form.mesadaPensional,
      form.arrendamientos,
      form.dividendos,
      form.rendimientosFinancieros,
      form.gananciaPromedio,
    ].every((field) => field !== undefined && field !== "");

    setIsFormComplete(allFieldsFilled);
  }, [form]);

  const isMobile = useMediaQuery("(max-width:880px)");

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  return createPortal(
    <Blanket>
      <StyledContainer $smallScreen={isMobile}>
        <Stack direction="column" padding="16px 24px" gap="16px">
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
          <Stack direction="column">
            <Stack
              width={!isMobile ? "auto" : "auto"}
              justifyContent="space-between"
              gap="24px"
              direction={!isMobile ? "row" : "column"}
            >
              <Stack width={!isMobile ? "356px" : "auto"}>
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
              </Stack>
              <Stack
                width={!isMobile ? "end" : "auto"}
                direction="column"
                gap="8px"
              >
                <Text
                  appearance="primary"
                  type="headline"
                  size="large"
                  weight="bold"
                >
                  $ 9’000.000
                </Text>
                <Text size="small" appearance="gray" weight="normal">
                  Total ingresos mensuales.
                </Text>
              </Stack>
            </Stack>
          </Stack>
          <Stack direction="column">
            <Grid
              templateColumns={!isMobile ? "repeat(3,1fr)" : "1fr"}
              gap="16px"
              autoRows="auto"
            >
              <IncomeEmployment
                values={[
                  form.salarioMensual?.toString() ?? "",
                  form.otrosPagos?.toString() ?? "",
                  form.mesadaPensional?.toString() ?? "",
                ]}
                onChange={(index, newValue) =>
                  handleFieldChange(
                    ["salarioMensual", "otrosPagos", "mesadaPensional"],
                    index,
                    newValue
                  )
                }
              />
              <IncomeCapital
                values={[
                  form.arrendamientos?.toString() ?? "",
                  form.dividendos?.toString() ?? "",
                  form.rendimientosFinancieros?.toString() ?? "",
                ]}
                onChange={(index, newValue) =>
                  handleFieldChange(
                    ["arrendamientos", "dividendos", "rendimientosFinancieros"],
                    index,
                    newValue
                  )
                }
              />
              <MicroBusinesses
                values={[form.gananciaPromedio?.toString() ?? ""]}
                onChange={(index, newValue) =>
                  handleFieldChange(["gananciaPromedio"], index, newValue)
                }
              />
            </Grid>
          </Stack>
          <Divider />
          <Stack
            padding="10px 0px"
            justifyContent="space-between"
            alignItems={!isMobile ? "end" : "start"}
            direction={!isMobile ? "row" : "column"}
            width={!isMobile ? "auto" : "100%"}
          >
            <Stack
              justifyContent="space-between"
              gap="15px"
              direction={!isMobile ? "row" : "column"}
              width={!isMobile ? "auto" : "100%"}
            ></Stack>
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
              <Button
                children="Guardar"
                appearance={isFormComplete ? "primary" : "gray"}
                disabled={!isFormComplete}
              />
            </Stack>
          </Stack>
        </Stack>
      </StyledContainer>
    </Blanket>,
    node
  );
}

export type { IncomeModalProps };

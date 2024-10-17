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
    debtor: string;
    monthly_salary?: number;
    other_monthly_payments?: number;
    pension_allowances?: number;
    leases?: number;
    dividends_or_shares?: number;
    financial_returns?: number;
    average_monthly_profit?: number;
    monthly_fees?: number;
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
      form.debtor,
      form.monthly_salary,
      form.other_monthly_payments,
      form.pension_allowances,
      form.leases,
      form.dividends_or_shares,
      form.financial_returns,
      form.average_monthly_profit,
      form.monthly_fees,
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
              <Stack width={!isMobile ? "317px" : "auto"}>
                <Select
                  id="income"
                  name="debtor"
                  label="Deudor"
                  placeholder="Seleccione una opción"
                  options={options}
                  value={form.debtor}
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
                  form.monthly_salary?.toString() ?? "",
                  form.other_monthly_payments?.toString() ?? "",
                  form.pension_allowances?.toString() ?? "",
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
                  form.leases?.toString() ?? "",
                  form.dividends_or_shares?.toString() ?? "",
                  form.financial_returns?.toString() ?? "",
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
                values={[
                  form.average_monthly_profit?.toString() ?? "",
                  form.monthly_fees?.toString() ?? "",
                ]}
                onChange={(index, newValue) =>
                  handleFieldChange(["gananciaPromedio"], index, newValue)
                }
              />
            </Grid>
          </Stack>
          <Divider />
          <Stack
            padding="10px 0px"
            justifyContent="end"
            alignItems={!isMobile ? "end" : "end"}
            direction={!isMobile ? "row" : "column"}
            width={!isMobile ? "auto" : "100%"}
          >
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

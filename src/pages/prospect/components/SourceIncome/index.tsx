import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { useMediaQuery } from "@inubekit/hooks";
import { Grid } from "@inubekit/grid";
import { Select } from "@inubekit/select";
import { currencyFormat } from "@utils/formatData/currency";

import { IncomeEmployment, IncomeCapital, MicroBusinesses } from "./config";
import { StyledContainer } from "./styles";
import { Button } from "@inubekit/button";
import { MdCached } from "react-icons/md";

interface ISourceIncomeProps {
  onChange: (name: string, newValue: string) => void;
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
  };
  options: { id: string; label: string; value: string }[];
  noShowSupport?: boolean;
  onlyDebtor?: boolean;
}

export function SourceIncome(props: ISourceIncomeProps) {
  const { form, onChange, options, noShowSupport, onlyDebtor } = props;

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

  const isMobile = useMediaQuery("(max-width:880px)");

  const totalSum = () => {
    return (
      (form.monthly_salary ?? 0) +
      (form.other_monthly_payments ?? 0) +
      (form.pension_allowances ?? 0) +
      (form.leases ?? 0) +
      (form.dividends_or_shares ?? 0) +
      (form.financial_returns ?? 0) +
      (form.average_monthly_profit ?? 0) +
      (form.monthly_fees ?? 0)
    );
  };

  return (
    <StyledContainer $smallScreen={isMobile}>
      <Stack direction="column" padding="16px 24px" gap="16px">
        <Stack direction="column">
          <Stack
            width={!isMobile ? "auto" : "auto"}
            justifyContent="space-between"
            alignItems={isMobile ? "center" : "normal"}
            gap="24px"
            direction={!isMobile ? "row" : "column"}
          >
            {!onlyDebtor && (
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
            )}
            {onlyDebtor && (
              <Stack direction="column" gap="8px">
                <Text type="body" size="small" weight="bold" appearance="gray">
                  Deudor
                </Text>
                <Text type="title" size="medium">
                  {form.debtor}
                </Text>
              </Stack>
            )}
            <Stack
              width={!isMobile ? "end" : "auto"}
              direction="column"
              gap="8px"
              alignItems="center"
            >
              <Text
                appearance="primary"
                type="headline"
                size="large"
                weight="bold"
              >
                {currencyFormat(totalSum())}
              </Text>
              <Text size="small" appearance="gray" weight="normal">
                Total ingresos mensuales.
              </Text>
            </Stack>
            {onlyDebtor && (
              <Stack alignItems="end">
                <Button variant="outlined" iconBefore={<MdCached />}>
                  Restablecer
                </Button>
              </Stack>
            )}
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
              noShowSupport={noShowSupport}
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
              noShowSupport={noShowSupport}
            />
            <MicroBusinesses
              values={[
                form.average_monthly_profit?.toString() ?? "",
                form.monthly_fees?.toString() ?? "",
              ]}
              onChange={(index, newValue) =>
                handleFieldChange(["gananciaPromedio"], index, newValue)
              }
              noShowSupport={noShowSupport}
            />
          </Grid>
        </Stack>
      </Stack>
    </StyledContainer>
  );
}

export type { ISourceIncomeProps };

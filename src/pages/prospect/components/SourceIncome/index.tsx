import { useState } from "react";
import { MdCached } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { useMediaQuery } from "@inubekit/hooks";
import { Grid } from "@inubekit/grid";
import { Select } from "@inubekit/select";
import { Button } from "@inubekit/button";

import { incomeCardData } from "@components/cards/IncomeCard/config";
import { ListModal } from "@components/modals/ListModal";
import { CardGray } from "@components/cards/CardGray";
import { currencyFormat } from "@utils/formatData/currency";

import { IncomeEmployment, IncomeCapital, MicroBusinesses } from "./config";
import { StyledContainer } from "./styles";

interface ISourceIncomeProps {
  onChange: (name: string, newValue: string) => void;
  form: {
    borrower: string;
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
  ShowSupport?: boolean;
  onlyDebtor?: boolean;
}

export function SourceIncome(props: ISourceIncomeProps) {
  const { form, onChange, options, ShowSupport, onlyDebtor } = props;

  const [isOpenModal, setIsOpenModal] = useState(false);

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
      <Stack
        direction="column"
        padding={isMobile ? "none" : "16px 24px"}
        gap="16px"
      >
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
                  name="borrower"
                  label="Deudor"
                  placeholder="Seleccione una opción"
                  options={options}
                  value={form.borrower}
                  onChange={(name, value) => onChange(name, value)}
                  size="compact"
                  fullwidth
                />
              </Stack>
            )}
            {onlyDebtor && !isMobile && (
              <Stack direction="column" gap="8px">
                <Text type="body" size="small" weight="bold" appearance="dark">
                  {incomeCardData.borrower}
                </Text>
                <Text type="title" size="medium">
                  {form.borrower}
                </Text>
              </Stack>
            )}
            {onlyDebtor && isMobile && (
              <CardGray label="Deudor" placeHolder={form.borrower} />
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
                {incomeCardData.income}
              </Text>
            </Stack>
            {onlyDebtor && (
              <Stack alignItems="end" width={isMobile ? "100%" : "auto"}>
                <Button
                  variant="outlined"
                  iconBefore={<MdCached />}
                  fullwidth={isMobile}
                  onClick={() => setIsOpenModal(true)}
                >
                  {incomeCardData.restore}
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
              ShowSupport={ShowSupport}
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
              ShowSupport={ShowSupport}
            />
            <MicroBusinesses
              values={[
                form.average_monthly_profit?.toString() ?? "",
                form.monthly_fees?.toString() ?? "",
              ]}
              onChange={(index, newValue) =>
                handleFieldChange(["gananciaPromedio"], index, newValue)
              }
              ShowSupport={ShowSupport}
            />
          </Grid>
        </Stack>
      </Stack>
      {isOpenModal && (
        <ListModal
          title={incomeCardData.restore}
          handleClose={() => setIsOpenModal(false)}
          handleSubmit={() => setIsOpenModal(false)}
          cancelButton="Cancelar"
          appearanceCancel="gray"
          buttonLabel={incomeCardData.restore}
          content={incomeCardData.description}
        />
      )}
    </StyledContainer>
  );
}

export type { ISourceIncomeProps };

import { useState } from "react";
import { MdCached, MdOutlineEdit } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { useMediaQuery } from "@inubekit/hooks";
import { Grid } from "@inubekit/grid";
import { Select } from "@inubekit/select";
import { Button } from "@inubekit/button";

import { incomeCardData } from "@components/cards/IncomeCard/config";
import { ListModal } from "@components/modals/ListModal";
import { CardGray } from "@components/cards/CardGray";
import { IncomeModal } from "@components/modals/IncomeModal";
import { currencyFormat } from "@utils/formatData/currency";
import { income } from "@mocks/add-prospect/income/income.mock";

import { IncomeEmployment, IncomeCapital, MicroBusinesses } from "./config";
import { StyledContainer } from "./styles";
import { dataReport } from "../TableObligationsFinancial/config";

interface ISourceIncomeProps {
  ShowSupport?: boolean;
  onlyDebtor?: boolean;
  disabled?: boolean;
}

export function SourceIncome(props: ISourceIncomeProps) {
  const { ShowSupport, onlyDebtor, disabled } = props;

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const isMobile = useMediaQuery("(max-width:880px)");

  const [form, setForm] = useState(income[0]);

  const onChange = (name: string, newValue: string) => {
    setForm({ ...form, [name]: newValue });
  };
  const options = income[0].borrowers;

  const values = {
    capital: form.capital ?? [],
    employment: form.employment ?? [],
    businesses: form.businesses ?? [],
  };

  const totalSum = () => {
    const sumCapital = values.capital.reduce(
      (acc, val) => acc + Number(val),
      0
    );
    const sumEmployment = values.employment.reduce(
      (acc, val) => acc + Number(val),
      0
    );
    const sumBusinesses = values.businesses.reduce(
      (acc, val) => acc + Number(val),
      0
    );

    return sumCapital + sumEmployment + sumBusinesses;
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
              <Stack
                alignItems="end"
                width={isMobile ? "100%" : "auto"}
                gap="16px"
              >
                <Button
                  variant="outlined"
                  iconBefore={<MdCached />}
                  fullwidth={isMobile}
                  onClick={() => setIsOpenModal(true)}
                >
                  {incomeCardData.restore}
                </Button>
                <Button
                  iconBefore={<MdOutlineEdit />}
                  onClick={() => setIsOpenEditModal(true)}
                >
                  {dataReport.edit}
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
              values={values.employment}
              ShowSupport={ShowSupport}
              disabled={disabled}
            />
            <IncomeCapital
              values={values.capital}
              ShowSupport={ShowSupport}
              disabled={disabled}
            />
            <MicroBusinesses
              values={values.businesses}
              ShowSupport={ShowSupport}
              disabled={disabled}
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
      {isOpenEditModal && (
        <IncomeModal handleClose={() => setIsOpenEditModal(false)} />
      )}
    </StyledContainer>
  );
}

export type { ISourceIncomeProps };

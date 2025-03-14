import { useEffect, useState } from "react";
import { MdCached, MdOutlineEdit } from "react-icons/md";
import { Stack, Text, Grid } from "@inubekit/inubekit";
import { useMediaQuery } from "@inubekit/hooks";
import { Select } from "@inubekit/select";
import { Button } from "@inubekit/button";

import { incomeCardData } from "@components/cards/IncomeCard/config";
import { ListModal } from "@components/modals/ListModal";
import { CardGray } from "@components/cards/CardGray";
import { IncomeModal } from "@pages/prospect/components/modals/IncomeModal";
import {
  currencyFormat,
  parseCurrencyString,
} from "@utils/formatData/currency";
import { get } from "@mocks/utils/dataMock.service";
import { IIncome } from "@services/types";

import { IncomeEmployment, IncomeCapital, MicroBusinesses } from "./config";
import { StyledContainer } from "./styles";
import { dataReport } from "../TableObligationsFinancial/config";

interface ISourceIncomeProps {
  openModal?: (state: boolean) => void;
  ShowSupport?: boolean;
  onlyDebtor?: boolean;
  disabled?: boolean;
}

export function SourceIncome(props: ISourceIncomeProps) {
  const { openModal, ShowSupport, onlyDebtor, disabled } = props;

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [values, setValues] = useState<IIncome | null>(null);

  const isMobile = useMediaQuery("(max-width:880px)");

  const handleSelectChange = (name: string, newValue: string) => {
    setValues((prev) => (prev ? { ...prev, [name]: newValue } : null));
  };

  const totalSum = () => {
    const sumCapital =
      values?.capital.reduce((acc, val) => acc + parseCurrencyString(val), 0) ??
      0;
    const sumEmployment =
      values?.employment.reduce(
        (acc, val) => acc + parseCurrencyString(val),
        0
      ) ?? 0;
    const sumBusinesses =
      values?.businesses.reduce(
        (acc, val) => acc + parseCurrencyString(val),
        0
      ) ?? 0;

    return sumCapital + sumEmployment + sumBusinesses;
  };

  useEffect(() => {
    get<IIncome[]>("income_mock")
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setValues(data[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching money destinations data:", error.message);
      });
  }, []);

  const handleIncomeChange = (
    category: "employment" | "capital" | "businesses",
    index: number,
    newValue: string
  ) => {
    setValues((prev) =>
      prev
        ? {
            ...prev,
            [category]: prev[category].map((val, i) =>
              i === index ? newValue : val
            ),
          }
        : null
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
                  options={values?.borrowers || []}
                  value={values?.borrower || ""}
                  onChange={handleSelectChange}
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
                  {values?.borrower}
                </Text>
              </Stack>
            )}
            {onlyDebtor && isMobile && (
              <CardGray label="Deudor" placeHolder={values?.borrower} />
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
                width={isMobile ? "100%" : "auto"}
                gap="16px"
                margin="auto 0 0 0"
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
                  onClick={() =>
                    openModal ? openModal(true) : setIsOpenEditModal(true)
                  }
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
            {values && (
              <>
                <IncomeEmployment
                  values={values.employment}
                  ShowSupport={ShowSupport}
                  disabled={disabled}
                  onValueChange={(index, newValue) =>
                    handleIncomeChange("employment", index, newValue)
                  }
                />
                <IncomeCapital
                  values={values.capital}
                  ShowSupport={ShowSupport}
                  disabled={disabled}
                  onValueChange={(index, newValue) =>
                    handleIncomeChange("capital", index, newValue)
                  }
                />
                <MicroBusinesses
                  values={values.businesses}
                  ShowSupport={ShowSupport}
                  disabled={disabled}
                  onValueChange={(index, newValue) =>
                    handleIncomeChange("businesses", index, newValue)
                  }
                />
              </>
            )}
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
        <IncomeModal
          handleClose={() => setIsOpenEditModal(false)}
          onlyDebtor={false}
          disabled={false}
        />
      )}
    </StyledContainer>
  );
}

export type { ISourceIncomeProps };

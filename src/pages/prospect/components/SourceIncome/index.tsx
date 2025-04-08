import { useEffect, useState } from "react";
import { MdCached, MdOutlineEdit } from "react-icons/md";
import { Stack, Text, Grid } from "@inubekit/inubekit";
import { useMediaQuery } from "@inubekit/hooks";
import { Button } from "@inubekit/button";

import { incomeCardData } from "@components/cards/IncomeCard/config";
import { ListModal } from "@components/modals/ListModal";
import { CardGray } from "@components/cards/CardGray";
import { IncomeModal } from "@pages/prospect/components/modals/IncomeModal";
import {
  currencyFormat,
  parseCurrencyString,
} from "@utils/formatData/currency";
import { IIncome } from "@services/types";

import { IncomeEmployment, IncomeCapital, MicroBusinesses } from "./config";
import { StyledContainer } from "./styles";
import { dataReport } from "../TableObligationsFinancial/config";
import { IIncomeSources } from "@services/incomeSources/types";

interface ISourceIncomeProps {
  openModal?: (state: boolean) => void;
  ShowSupport?: boolean;
  disabled?: boolean;
  data?: IIncomeSources;
  showEdit?: boolean;
}

export function SourceIncome(props: ISourceIncomeProps) {
  const { openModal, ShowSupport, disabled, showEdit = true, data } = props;

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [values, setValues] = useState<IIncome | null>(null);

  const isMobile = useMediaQuery("(max-width:880px)");

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
    const fetchIncomeData = async () => {
      try {
        if (data) {
          setValues({
            borrower_id: data.identificationNumber,
            borrower: `${data.name} ${data.surname}`,
            capital: [
              (data.leases || 0).toString(),
              (data.dividends ?? 0).toString(),
              (data.financialIncome ?? 0).toString(),
            ],
            employment: [
              (data.periodicSalary ?? 0).toString(),
              (data.otherNonSalaryEmoluments ?? 0).toString(),
              (data.pensionAllowances ?? 0).toString(),
            ],
            businesses: [
              (data.professionalFees ?? 0).toString(),
              (data.personalBusinessUtilities ?? 0).toString(),
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching income data:", error);
      }
    };

    fetchIncomeData();
  }, [data]);

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
            {!isMobile && (
              <Stack direction="column" gap="8px">
                <Text type="body" size="small" weight="bold" appearance="dark">
                  {incomeCardData.borrower}
                </Text>
                <Text type="title" size="medium">
                  {values?.borrower}
                </Text>
              </Stack>
            )}
            {isMobile && (
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
              {showEdit && (
                <Button
                  iconBefore={<MdOutlineEdit />}
                  onClick={() =>
                    openModal ? openModal(true) : setIsOpenEditModal(true)
                  }
                >
                  {dataReport.edit}
                </Button>
              )}
            </Stack>
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
          disabled={false}
        />
      )}
    </StyledContainer>
  );
}

export type { ISourceIncomeProps };

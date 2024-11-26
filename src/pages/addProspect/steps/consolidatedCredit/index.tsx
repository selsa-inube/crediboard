import { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Stack } from "@inubekit/stack";
import { Divider } from "@inubekit/divider";
import { Text } from "@inubekit/text";
import { useMediaQuery } from "@inubekit/hooks";

import { CardConsolidatedCredit } from "@components/cards/CardConsolidatedCredit";
import { currencyFormat } from "@utils/formatData/currency";
import { mockConsolidatedCredit } from "@mocks/add-prospect/consolidates-credit/consolidatedcredit.mock";

import { dataConsolidated } from "./config";

interface IConsolidatedCreditProps {
  initialValues: {
    totalCollected: number;
    selectedValues: Record<string, number>;
  };
  handleOnChange: (
    creditId: string,
    oldValue: number,
    newValue: number
  ) => void;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ConsolidatedCredit(props: IConsolidatedCreditProps) {
  const { initialValues, handleOnChange, onFormValid } = props;

  useEffect(() => {
    const hasSelectedValues = Object.values(initialValues.selectedValues).some(
      (value) => value > 0
    );
    onFormValid(hasSelectedValues);
  }, [initialValues.selectedValues, onFormValid]);

  const consolidatedCreditSchema = Yup.object().shape({
    totalCollected: Yup.number().required("Este campo es obligatorio"),
    selectedValues: Yup.object().shape({
      creditId: Yup.number().min(0, "Este campo es obligatorio"),
    }),
  });

  const debtorData = mockConsolidatedCredit[0];
  const isMobile = useMediaQuery("(max-width:880px)");

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={consolidatedCreditSchema}
      onSubmit={(values) => {
        console.log("Valores enviados:", values);
      }}
      validate={(values) => {
        const hasSelectedValues = Object.values(values.selectedValues).some(
          (value) => value > 0
        );
        onFormValid(hasSelectedValues);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Stack direction="column" gap="24px">
            <Text type="body" size="medium">
              {dataConsolidated.select}
            </Text>
            <Stack justifyContent="space-between" alignItems="end">
              <Stack direction="column">
                <Text type="body" size="small" weight="bold" appearance="gray">
                  {dataConsolidated.debtor}
                </Text>
                <Text type="title" size="medium">
                  {debtorData.name}
                </Text>
              </Stack>
              <Stack direction="column" alignItems="center">
                <Text
                  type="headline"
                  size="large"
                  weight="bold"
                  appearance="primary"
                >
                  {currencyFormat(values.totalCollected)}
                </Text>
                <Text type="body" size="small" appearance="gray">
                  {dataConsolidated.totalvalue}
                </Text>
              </Stack>
            </Stack>
            <Divider />
            <Stack
              gap="16px"
              wrap="wrap"
              justifyContent={isMobile ? "center" : "initial"}
            >
              {debtorData.data_card.map((creditData) => (
                <CardConsolidatedCredit
                  key={creditData.consolidated_credit_id}
                  title={creditData.consolidated_credit_title}
                  code={creditData.consolidated_credit_code}
                  expiredValue={creditData.expired_value}
                  nextDueDate={creditData.next_due_date}
                  fullPayment={creditData.full_payment}
                  date={new Date(creditData.date)}
                  onUpdateTotal={(oldValue, newValue) => {
                    const newTotal =
                      values.totalCollected - oldValue + newValue;
                    setFieldValue("totalCollected", newTotal);
                    setFieldValue(
                      `selectedValues.${creditData.consolidated_credit_id}`,
                      newValue
                    );
                    handleOnChange(
                      creditData.consolidated_credit_id,
                      oldValue,
                      newValue
                    );
                  }}
                  arrears={creditData.arrears === "Y"}
                  initialValue={
                    values.selectedValues[creditData.consolidated_credit_id] ||
                    0
                  }
                />
              ))}
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}

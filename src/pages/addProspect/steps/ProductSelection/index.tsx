import { useEffect } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Toggle } from "@inubekit/toggle";
import { Divider } from "@inubekit/divider";

import { ProductSelectCard } from "@components/cards/ProcuctSelectCard";
import { Fieldset } from "@components/data/Fieldset";
import { lineOfCredit } from "@mocks/add-prospect/line-of-credit/lineOfCredit.mock";

import { electionData } from "./config";

interface IProductSelectionProps {
  initialValues: {
    selectedProducts: string[];
    generalToggleChecked: boolean;
    togglesState: boolean[];
  };
  handleOnChange: {
    setSelectedProducts: React.Dispatch<React.SetStateAction<string[]>>;
    onGeneralToggleChange: () => void;
    onToggleChange: (index: number) => void;
  };
  onFormValid: (isValid: boolean) => void;
}

export function ProductSelection(props: IProductSelectionProps) {
  const {
    initialValues: { selectedProducts, generalToggleChecked, togglesState },
    handleOnChange: {
      setSelectedProducts,
      onGeneralToggleChange,
      onToggleChange,
    },
    onFormValid,
  } = props;

  const validationSchema = Yup.object().shape({
    selectedProducts: Yup.array().when("generalToggleChecked", {
      is: (value: boolean) => value === false,
      then: (schema) => schema.min(1, "Debes seleccionar al menos un producto"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const initialValues = {
    selectedProducts,
    generalToggleChecked,
    togglesState,
  };

  useEffect(() => {
    const isValid = generalToggleChecked || selectedProducts.length > 0;
    onFormValid(isValid);
  }, [generalToggleChecked, selectedProducts, onFormValid]);

  useEffect(() => {
    if (generalToggleChecked) {
      setSelectedProducts([]);
    }
  }, [generalToggleChecked, setSelectedProducts]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={() => {}}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Stack direction="column" gap="20px">
            <Stack direction="column" gap="16px">
              <Text type="label" size="large" weight="bold">
                {electionData.title}
              </Text>
              <Stack gap="8px">
                <Field name="generalToggleChecked">
                  {({ field }: { field: { value: boolean; name: string } }) => (
                    <Toggle
                      {...field}
                      value={field.value.toString()}
                      checked={field.value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("generalToggleChecked", e.target.checked);
                        onGeneralToggleChange();
                      }}
                    />
                  )}
                </Field>
                <Text
                  type="label"
                  size="large"
                  weight="bold"
                  appearance={generalToggleChecked ? "success" : "danger"}
                >
                  {generalToggleChecked ? electionData.yes : electionData.no}
                </Text>
              </Stack>
            </Stack>
            <Stack gap="16px">
              {lineOfCredit.slice(0, 3).map((credit) => (
                <ProductSelectCard
                  key={credit.line_of_credit_id}
                  amount={credit.loan_amount_limit}
                  rate={credit.interest_rate}
                  term={credit.loan_term_limit}
                  description={credit.description_use}
                  disabled={generalToggleChecked}
                  isSelected={values.selectedProducts.includes(
                    credit.line_of_credit_id
                  )}
                  onSelect={() => {
                    const newSelected = values.selectedProducts.includes(
                      credit.line_of_credit_id
                    )
                      ? values.selectedProducts.filter(
                          (id) => id !== credit.line_of_credit_id
                        )
                      : [...values.selectedProducts, credit.line_of_credit_id];
                    setFieldValue("selectedProducts", newSelected);
                    setSelectedProducts(newSelected);
                  }}
                />
              ))}
            </Stack>
            <Fieldset>
              {Object.entries(electionData.data).map(
                ([key, question], index) => (
                  <Stack
                    direction="column"
                    key={key}
                    gap="16px"
                    padding="4px 10px"
                  >
                    <Text type="body" size="medium">
                      {question}
                    </Text>
                    <Stack gap="8px">
                      <Field name={`togglesState[${index}]`}>
                        {({
                          field,
                        }: {
                          field: { value: boolean; name: string };
                        }) => (
                          <Toggle
                            {...field}
                            value={field.value.toString()}
                            checked={field.value}
                            onChange={() => {
                              onToggleChange(index);
                              setFieldValue(
                                `togglesState[${index}]`,
                                !field.value
                              );
                            }}
                          />
                        )}
                      </Field>
                      <Text
                        type="label"
                        size="large"
                        weight="bold"
                        appearance={
                          values.togglesState[index] ? "success" : "danger"
                        }
                      >
                        {values.togglesState[index]
                          ? electionData.yes
                          : electionData.no}
                      </Text>
                    </Stack>
                    {index < Object.entries(electionData.data).length - 1 && (
                      <Divider dashed />
                    )}
                  </Stack>
                )
              )}
            </Fieldset>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}

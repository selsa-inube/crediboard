import { useEffect } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Stack, Text, Divider } from "@inubekit/inubekit";
import { Toggle } from "@inubekit/toggle";

import { CardProductSelection } from "@pages/addProspect/components/CardProductSelection";
import { Fieldset } from "@components/data/Fieldset";
import { mockGetMoneyDestinations } from "@mocks/add-prospect/money-destinations/moneydestinations.mock";
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
  isMobile: boolean;
  showQuestion: string;
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
    isMobile,
    showQuestion,
  } = props;

  const validationSchema = Yup.object().shape({
    selectedProducts: Yup.array().when("generalToggleChecked", {
      is: (value: boolean) => value === false,
      then: (schema) => schema.min(1, ""),
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

  const selectedQuestions =
    mockGetMoneyDestinations.find((item) => item.id === showQuestion)
      ?.question || [];

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
            <Fieldset>
              <Stack
                gap="16px"
                padding={isMobile ? "0px 6px" : "0px 12px"}
                wrap="wrap"
              >
                {lineOfCredit.slice(0, 3).map((credit) => (
                  <CardProductSelection
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
                        : [
                            ...values.selectedProducts,
                            credit.line_of_credit_id,
                          ];
                      setFieldValue("selectedProducts", newSelected);
                      setSelectedProducts(newSelected);
                    }}
                  />
                ))}
              </Stack>
            </Fieldset>
            <Fieldset>
              {selectedQuestions.map((questionIndex, index) => {
                const question = Object.entries(electionData.data)[
                  questionIndex - 1
                ];
                return (
                  <Stack
                    direction="column"
                    key={question[0]}
                    gap="16px"
                    padding="4px 10px"
                  >
                    <Text type="body" size="medium">
                      {question[1]}
                    </Text>
                    <Stack gap="8px">
                      <Field name={`togglesState[${questionIndex - 1}]`}>
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
                              onToggleChange(questionIndex - 1);
                              setFieldValue(
                                `togglesState[${questionIndex - 1}]`,
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
                          values.togglesState[questionIndex - 1]
                            ? "success"
                            : "danger"
                        }
                      >
                        {values.togglesState[questionIndex - 1]
                          ? electionData.yes
                          : electionData.no}
                      </Text>
                    </Stack>
                    {index !== selectedQuestions.length - 1 && (
                      <Divider dashed />
                    )}
                  </Stack>
                );
              })}
            </Fieldset>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}

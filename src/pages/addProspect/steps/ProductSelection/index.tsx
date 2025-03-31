import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Stack, Text } from "@inubekit/inubekit";
import { Toggle } from "@inubekit/toggle";
import { Divider } from "@inubekit/divider";
import { useFlag } from "@inubekit/flag";

import { IBusinessUnitRules } from "@services/businessUnitRules/types";
import { CardProductSelection } from "@pages/addProspect/components/CardProductSelection";
import { Fieldset } from "@components/data/Fieldset";
import { postBusinessUnitRules } from "@services/businessUnitRules";
import { AppContext } from "@context/AppContext";
import { CustomerContext } from "@context/CustomerContext";
import { removeDuplicates } from "@utils/mappingData/mappings";
import { getMonthsElapsed } from "@utils/formatData/date";

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
  choiceMoneyDestination: string;
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
    choiceMoneyDestination,
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [creditLines, setCreditLines] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [percentagePayable, setPercentagePayable] = useState<any[]>([]);
  const [showFirstQuestion, setShowFirstQuestion] = useState(false);

  useEffect(() => {
    if (percentagePayable.length > 0) {
      const allValuesZero = percentagePayable.every(
        (item) => item.value === "0"
      );
      setShowFirstQuestion(!allValuesZero);
    }
  }, [percentagePayable]);

  const { addFlag } = useFlag();

  useEffect(() => {
    const isValid = generalToggleChecked || selectedProducts.length > 0;
    onFormValid(isValid);
  }, [generalToggleChecked, selectedProducts, onFormValid]);

  useEffect(() => {
    if (generalToggleChecked) {
      setSelectedProducts([]);
    }
  }, [generalToggleChecked, setSelectedProducts]);

  const { businessUnitSigla } = useContext(AppContext);

  const businessUnitPublicCode: string =
    JSON.parse(businessUnitSigla).businessUnitPublicCode;

  const { customerData } = useContext(CustomerContext);

  const lineOfCreditRules = useMemo(
    () => ({
      ruleName: "LineOfCredit",
      conditions: [
        {
          condition: "MoneyDestination",
          value: choiceMoneyDestination,
        },
        {
          condition: "ClientType",
          value:
            customerData.generalAttributeClientNaturalPersons[0].associateType.substring(
              0,
              1
            ),
        },
        {
          condition: "EmploymentContractTermType",
          value:
            customerData.generalAttributeClientNaturalPersons[0].employmentType.substring(
              0,
              2
            ),
        },
      ],
    }),
    [choiceMoneyDestination, customerData]
  );

  const percentagePayableRules = useMemo(
    () => ({
      ruleName: "PercentagePayableViaExtraInstallments",
      conditions: [
        {
          condition: "LineOfCredit",
          value: "Educación",
        },
        // {
        //   condition: "PrimaryIncomeType",
        //   value: "PeriodicSalary",
        // },
        {
          condition: "ClientType",
          value:
            customerData.generalAttributeClientNaturalPersons[0].associateType.substring(
              0,
              1
            ),
        },
        // {
        //   condition: "LoanAmount",
        //   value: 0,
        // },
        // {
        //   condition: "LoanTerm",
        //   value: "",
        // },
        {
          condition: "AffiliateSeniority",
          value: getMonthsElapsed(
            customerData.generalAssociateAttributes[0].affiliateSeniorityDate
          ),
        },
      ],
    }),
    [customerData]
  );

  const handleSubmit = useCallback(
    async (
      rules: IBusinessUnitRules,
      setState: React.Dispatch<IBusinessUnitRules[]>
    ) => {
      const handleFlag = (error: unknown) => {
        addFlag({
          title: "Error",
          description: `Error al enviar la solicitud: ${error}`,
          appearance: "danger",
          duration: 5000,
        });
      };

      try {
        const response = await postBusinessUnitRules(
          businessUnitPublicCode,
          rules
        );

        if (response) {
          setState(Array.isArray(response) ? response : [response]);
        }
      } catch (error) {
        handleFlag(error);
      }
    },
    [businessUnitPublicCode, addFlag]
  );

  useEffect(() => {
    handleSubmit(lineOfCreditRules, setCreditLines);
  }, [lineOfCreditRules, handleSubmit]);

  const lineOfCreditResponse = removeDuplicates(creditLines, "value");

  useEffect(() => {
    handleSubmit(percentagePayableRules, setPercentagePayable);
  }, [percentagePayableRules, handleSubmit]);

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
                {lineOfCreditResponse.length > 0 ? (
                  lineOfCreditResponse.map((item, index) => (
                    <Stack key={index} direction="column">
                      <CardProductSelection
                        key={index}
                        amount={item.loan_amount_limit}
                        rate={item.interest_rate}
                        term={item.loan_term_limit}
                        description={item.value}
                        disabled={generalToggleChecked}
                        isSelected={values.selectedProducts.includes(
                          index.toString()
                        )}
                        onSelect={() => {
                          const newSelected = values.selectedProducts.includes(
                            index.toString()
                          )
                            ? values.selectedProducts.filter(
                                (id) => id !== index.toString()
                              )
                            : [...values.selectedProducts, index.toString()];
                          setFieldValue("selectedProducts", newSelected);
                          setSelectedProducts(newSelected);
                        }}
                      />
                    </Stack>
                  ))
                ) : (
                  <Text type="body" size="medium">
                    {electionData.load}
                  </Text>
                )}
              </Stack>
            </Fieldset>
            <Fieldset>
              {Object.entries(electionData.data)
                .filter((_, index) => index !== 0 || showFirstQuestion)
                .map(([key, question], index) => (
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
                ))}
            </Fieldset>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}

import { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { MdInfoOutline, MdOutlineAttachMoney } from "react-icons/md";
import { Divider } from "@inubekit/divider";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Textfield } from "@inubekit/textfield";
import { Toggle } from "@inubekit/toggle";
import { Select } from "@inubekit/select";
import { Icon } from "@inubekit/icon";
import { inube } from "@inubekit/foundations";
import { useParams } from "react-router-dom"; 

import { Fieldset } from "@components/data/Fieldset";
import { CreditLimit } from "@components/modals/CreditLimit";
import { PaymentCapacity } from "@components/modals/PaymentCapacityModal";
import { ReciprocityModal } from "@components/modals/ReciprocityModal";
import { ScoreModal } from "@components/modals/FrcModal";

import { currencyFormat } from "@utils/formatData/currency";
import { get } from "@mocks/utils/dataMock.service";
import { loanAmount } from "@mocks/add-prospect/loan-amount/loanAmount.mock"; 
import {
  mockPayAmount,
  mockPeriodicity,
} from "@mocks/add-prospect/payment-channel/paymentchannel.mock";
import { IPaymentChannel } from "@services/types";

import { dataAmount } from "./config";

export interface ILoanAmountProps {
  value?: number;
  initialValues: {
    inputValue: string;
    toggleChecked: boolean;
    paymentPlan: string;
    periodicity: string;
    payAmount: string;
  };
  isMobile: boolean;
  handleOnChange: (newData: Partial<ILoanAmountProps["initialValues"]>) => void;
  onFormValid: (isValid: boolean) => void;
}

export function LoanAmount(props: ILoanAmountProps) {
  const {
    value = 10000000,
    initialValues,
    isMobile,
    handleOnChange,
    onFormValid,
  } = props;

  const { id } = useParams();
  const loanId = parseInt(id || "101", 10); 

  const loanText =
    loanAmount.find((loan) => loan.id === loanId)?.choice ||
    "¿Qué valor espera recibir?"; 

  const [requestValue, setRequestValue] = useState<IPaymentChannel[]>();
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [creditModal, setCreditModal] = useState(false);
  const [loadingCredit, setLoadingCredit] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpenModal = () => {
    setCreditModal(true);
    setLoadingCredit(true);
    setTimeout(() => {
      setLoadingCredit(false);
    }, 2000);
  };

  const handleOpenModals = (modalName: string) => {
    setOpenModal(modalName);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    get("mockRequest_value")
      .then((data) => {
        if (data && Array.isArray(data)) {
          setRequestValue(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching money destinations data:", error.message);
      });
  }, []);

  const LoanAmountValidationSchema = Yup.object({
    inputValue: Yup.string().required(""),
    paymentPlan: Yup.string().required(""),
    periodicity: Yup.string().required(""),
    payAmount: Yup.string().required(""),
  });

  return (
    <Fieldset hasOverflow>
      <Formik
        initialValues={initialValues}
        validationSchema={LoanAmountValidationSchema}
        onSubmit={() => {}}
        validate={(values) => {
          const numericValue =
            parseFloat(values.inputValue.replace(/[^0-9]/g, "")) || 0;
          const isValid =
            numericValue > 0 &&
            values.paymentPlan.trim() !== "" &&
            values.periodicity.trim() !== "" &&
            values.payAmount.trim() !== "";
          onFormValid(isValid);
        }}
        validateOnMount={true}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Stack
              direction="column"
              gap="16px"
              padding={isMobile ? "10px" : "0px 10px"}
            >
              <Stack direction="column" alignItems="center" gap="8px">
                <Text
                  appearance="primary"
                  type="headline"
                  size={isMobile ? "medium" : "large"}
                  weight="bold"
                >
                  {currencyFormat(value)}
                </Text>
                <Stack
                  alignItems="center"
                  justifyContent="space-between"
                  gap="8px"
                >
                  <Text size="small" appearance="gray" weight="normal">
                    {dataAmount.availableQuota}
                  </Text>
                  <Icon
                    icon={<MdInfoOutline />}
                    appearance="primary"
                    size="16px"
                    onClick={handleOpenModal}
                    cursorHover={true}
                  />
                </Stack>
              </Stack>
              <Divider dashed />
              <Stack direction="column">
                <Text type="label" size="medium" weight="bold">
                  {loanText}
                </Text>
                <Field name="inputValue">
                  {() => (
                    <Textfield
                      id="1"
                      size="compact"
                      iconBefore={
                        <MdOutlineAttachMoney
                          color={inube.palette.green.G400}
                        />
                      }
                      type="text"
                      fullwidth={true}
                      value={values.inputValue}
                      onChange={(e) => {
                        const rawValue =
                          parseFloat(e.target.value.replace(/[^0-9]/g, "")) ||
                          0;
                        const formattedValue = currencyFormat(rawValue, false);
                        setFieldValue("inputValue", formattedValue);
                        handleOnChange({ inputValue: formattedValue });
                      }}
                    />
                  )}
                </Field>
              </Stack>
              <Divider dashed />
              <Stack direction="column" gap="16px">
                <Text type="body" size="medium">
                  {dataAmount.currentObligations}
                </Text>
                <Stack gap="8px" alignItems="center">
                  <Toggle
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setFieldValue("toggleChecked", checked);
                      handleOnChange({ toggleChecked: checked });
                    }}
                    checked={values.toggleChecked}
                  />
                  <Text
                    type="label"
                    size="large"
                    weight="bold"
                    appearance={values.toggleChecked ? "success" : "danger"}
                  >
                    {values.toggleChecked ? "SI" : "NO"}
                  </Text>
                </Stack>
              </Stack>
              <Divider dashed />
              <Stack direction={isMobile ? "column" : "row"} gap="16px">
                <Stack direction="column" width="100%">
                  <Text type="label" size="medium" weight="bold">
                    {dataAmount.ordinaryPayment}
                  </Text>
                  <Field name="paymentPlan">
                    {() => (
                      <Select
                        id="paymentPlan"
                        options={requestValue || []}
                        placeholder={dataAmount.selectOption}
                        name="paymentPlan"
                        onChange={(_, newValue: string) => {
                          setFieldValue("paymentPlan", newValue);
                          handleOnChange({ paymentPlan: newValue });
                        }}
                        value={values.paymentPlan}
                        size="compact"
                        fullwidth={true}
                      />
                    )}
                  </Field>
                </Stack>
                <Stack direction="column" width="100%">
                  <Stack gap="4px">
                    <Text type="label" size="medium" weight="bold">
                      {dataAmount.Periodicity}
                    </Text>
                    <Text type="label" size="small" appearance="danger">
                      {dataAmount.Requested}
                    </Text>
                  </Stack>
                  <Field name="periodicity">
                    {() => (
                      <Select
                        id="periodicity"
                        options={mockPeriodicity}
                        placeholder={dataAmount.selectOption}
                        name="periodicity"
                        onChange={(_, newValue: string) => {
                          setFieldValue("periodicity", newValue);
                          handleOnChange({ periodicity: newValue });
                        }}
                        value={values.periodicity}
                        size="compact"
                        fullwidth={true}
                      />
                    )}
                  </Field>
                </Stack>
                <Stack direction="column" width="100%">
                  <Text type="label" size="medium" weight="bold">
                    {dataAmount.paymentDate}
                  </Text>
                  <Field name="payAmount">
                    {() => (
                      <Select
                        id="payAmount"
                        options={mockPayAmount}
                        placeholder={dataAmount.selectOption}
                        name="payAmount"
                        onChange={(_, newValue: string) => {
                          setFieldValue("payAmount", newValue);
                          handleOnChange({ payAmount: newValue });
                        }}
                        value={values.payAmount}
                        size="compact"
                        fullwidth={true}
                      />
                    )}
                  </Field>
                </Stack>
              </Stack>
            </Stack>
            {creditModal ? (
              <CreditLimit
                handleClose={() => setCreditModal(false)}
                title="Origen de cupo"
                portalId="portal"
                loading={loadingCredit}
                onOpenPaymentCapacityModal={() =>
                  handleOpenModals("paymentCapacity")
                }
                onOpenReciprocityModal={() =>
                  handleOpenModals("reciprocityModal")
                }
                onOpenFrcModal={() => handleOpenModals("scoreModal")}
              />
            ) : (
              <></>
            )}
            {openModal === "paymentCapacity" ? (
              <PaymentCapacity
                title="Cupo máx. capacidad de pago"
                portalId="portal"
                loading={loading}
                handleClose={() => setOpenModal(null)}
                reportedIncomeSources={2000000}
                reportedFinancialObligations={6789000}
                subsistenceReserve={2000000}
                availableForNewCommitments={5000000}
                maxVacationTerm={12}
                maxAmount={1000000}
                iconVisible={true}
              />
            ) : (
              <></>
            )}
            {openModal === "reciprocityModal" ? (
              <ReciprocityModal
                portalId="portal"
                loading={loading}
                handleClose={() => setOpenModal(null)}
                balanceOfContributions={40000000}
                accordingToRegulation={2}
                assignedQuota={1000000}
              />
            ) : (
              <></>
            )}
            {openModal === "scoreModal" ? (
              <ScoreModal
                title="Score Details"
                handleClose={() => setOpenModal(null)}
                subTitle="Your Financial Score"
                loading={loading}
                totalScore={150}
                seniority={150}
                centralRisk={50}
                employmentStability={230}
                maritalStatus={30}
                economicActivity={118}
                monthlyIncome={3000000}
                maxIndebtedness={50000000}
              />
            ) : (
              <></>
            )}
          </Form>
        )}
      </Formik>
    </Fieldset>
  );
}
import { useEffect, useState } from "react";
import { MdInfoOutline, MdOutlineAttachMoney } from "react-icons/md";
import { Divider } from "@inubekit/divider";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Textfield } from "@inubekit/textfield";
import { Toggle } from "@inubekit/toggle";
import { Select } from "@inubekit/select";
import { Icon } from "@inubekit/icon";
import { inube } from "@inubekit/foundations";
import { useMediaQuery } from "@inubekit/hooks";

import { Fieldset } from "@components/data/Fieldset";
import { CreditLimit } from "@components/modals/CreditLimit";
import { PaymentCapacity } from "@components/modals/PaymentCapacityModal";
import { ReciprocityModal } from "@components/modals/ReciprocityModal";
import { ScoreModal } from "@components/modals/FrcModal";

import { currencyFormat } from "@utils/formatData/currency";
import { get } from "@mocks/utils/dataMock.service";
import { IPaymentChannel } from "@services/types";

import { dataAmount } from "./config";

export interface ILoanAmountProps {
  value: number;
  initialValues: {
    inputValue: string;
    toggleChecked: boolean;
    paymentPlan: string;
  };
  handleOnChange: (
    newData: Partial<ILoanAmountProps["initialValues"]>
  ) => void;
  onFormValid: (isValid: boolean) => void;  
}

export function LoanAmount(props: ILoanAmountProps) {
  const { value, initialValues, handleOnChange, onFormValid } = props;
  const [requestValue, setRequestValue] = useState<IPaymentChannel[]>();
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [creditModal, setCreditModal] = useState(false);

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

  useEffect(() => {
    const isValid = initialValues.inputValue.trim() !== "" && initialValues.paymentPlan.trim() !== "";
    if (onFormValid) {
      onFormValid(isValid); 
    }
  }, [initialValues.inputValue, initialValues.paymentPlan, onFormValid]);

  const onChangeSelect = (newValue: string) => {
    handleOnChange({ paymentPlan: newValue });
  };

  const onChangeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleOnChange({ toggleChecked: e.target.checked });
  };

  const onChangeTextfield = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = parseFloat(e.target.value.replace(/[^0-9]/g, "")) || 0;
    handleOnChange({ inputValue: currencyFormat(rawValue, false) });
  };

  const isMobile = useMediaQuery("(max-width:880px)");

  return (
    <Fieldset hasOverflow>
      <Stack
        direction="column"
        gap="16px"
        padding={isMobile ? "10px" : "0px 10px"}
      >
        <Stack direction="column" alignItems="center" gap="8px">
          <Text appearance="primary" type="headline" size="large" weight="bold">
            {currencyFormat(value)}
          </Text>
          <Stack alignItems="center" justifyContent="space-between" gap="8px">
            <Text size="small" appearance="gray" weight="normal">
              {dataAmount.availableQuota}
            </Text>
            <Icon
              icon={<MdInfoOutline />}
              appearance="primary"
              size="16px"
              onClick={() => setCreditModal(true)}
              cursorHover={true}
            />
          </Stack>
        </Stack>
        <Divider dashed />
        <Stack direction="column">
          <Text type="label" size="medium" weight="bold">
            {dataAmount.expectToReceive}
          </Text>
          <Textfield
            id="1"
            size="compact"
            iconBefore={
              <MdOutlineAttachMoney color={inube.palette.green.G400} />
            }
            type="text"
            fullwidth={true}
            value={initialValues.inputValue}
            onChange={onChangeTextfield}
          />
        </Stack>
        <Divider dashed />
        <Stack direction="column" gap="16px">
          <Text type="body" size="medium">
            {dataAmount.currentObligations}
          </Text>
          <Stack gap="8px" alignItems="center">
            <Toggle
              onChange={onChangeToggle}
              checked={initialValues.toggleChecked}
            />
            <Text
              type="label"
              size="large"
              weight="bold"
              appearance={initialValues.toggleChecked ? "success" : "danger"}
            >
              {initialValues.toggleChecked ? "SI" : "NO"}
            </Text>
          </Stack>
        </Stack>
        <Divider dashed />
        <Stack direction="column">
          <Text type="label" size="medium" weight="bold">
            {dataAmount.ordinaryPayment}
          </Text>
          <Select
            id="paymentPlan"
            options={requestValue || []}
            placeholder={dataAmount.selectOption}
            name="paymentPlan"
            onChange={onChangeSelect}
            value={initialValues.paymentPlan}
            fullwidth={true}
          />
        </Stack>
      </Stack>
      {creditModal ? (
        <CreditLimit
          handleClose={() => setCreditModal(false)}
          title="Origen de cupo"
          portalId="portal"
          maxPaymentCapacity={50000000}
          maxReciprocity={40000000}
          maxDebtFRC={45000000}
          assignedLimit={0}
          currentPortfolio={10000000}
          maxUsableLimit={20000000}
          availableLimitWithoutGuarantee={15000000}
          onOpenPaymentCapacityModal={() => setOpenModal("paymentCapacity")}
          onOpenReciprocityModal={() => setOpenModal("reciprocityModal")}
          onOpenFrcModal={() => setOpenModal("scoreModal")}
        />
      ) : (
        <></>
      )}
      {openModal === "paymentCapacity" ? (
        <PaymentCapacity
          title="Cupo máx. capacidad de pago"
          portalId="portal"
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
    </Fieldset>
  );
}

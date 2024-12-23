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
}

export function LoanAmount(props: ILoanAmountProps) {
  const { value } = props;
  const [toggleChecked, setToggleChecked] = useState(false);
  const [requestValue, setRequestValue] = useState<IPaymentChannel[]>();
  const [form, setForm] = useState({ paymentPlan: "" });
  const [inputValue, setInputValue] = useState("");
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

  const onChangeSelect = (name: string, newValue: string) => {
    setForm({ ...form, [name]: newValue });
  };

  const onChangeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToggleChecked(e.target.checked);
  };

  const onChangeTextfield = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = parseFloat(e.target.value.replace(/[^0-9]/g, "")) || 0;
    setInputValue(currencyFormat(rawValue, false));
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
              onClick={handleOpenModal}
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
            value={inputValue}
            onChange={onChangeTextfield}
          />
        </Stack>
        <Divider dashed />
        <Stack direction="column" gap="16px">
          <Text type="body" size="medium">
            {dataAmount.currentObligations}
          </Text>
          <Stack gap="8px" alignItems="center">
            <Toggle onChange={onChangeToggle} checked={toggleChecked} />
            <Text
              type="label"
              size="large"
              weight="bold"
              appearance={toggleChecked ? "success" : "danger"}
            >
              {toggleChecked ? "SI" : "NO"}
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
            value={form["paymentPlan"]}
            fullwidth={true}
          />
        </Stack>
      </Stack>
      {creditModal ? (
        <CreditLimit
          handleClose={() => setCreditModal(false)}
          title="Origen de cupo"
          portalId="portal"
          loading={loadingCredit}
          onOpenPaymentCapacityModal={() => handleOpenModals("paymentCapacity")}
          onOpenReciprocityModal={() => handleOpenModals("reciprocityModal")}
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
    </Fieldset>
  );
}

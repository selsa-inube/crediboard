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
            <Icon icon={<MdInfoOutline />} appearance="primary" size="16px" />
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
    </Fieldset>
  );
}

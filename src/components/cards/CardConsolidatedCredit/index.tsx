import { useState, useRef } from "react";
import { MdClear } from "react-icons/md";
import { Divider } from "@inubekit/divider";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Tag } from "@inubekit/tag";
import { Button } from "@inubekit/button";

import { formatPrimaryDate } from "@utils/formatData/date";
import { currencyFormat } from "@utils/formatData/currency";

import { StyledContainer, StyledInput } from "./styles";
import { dataConsolidatedCredit } from "./config";

export interface ICardConsolidatedCreditProps {
  onUpdateTotal: (oldValue: number, newValue: number) => void;
  title: string;
  code: string;
  expiredValue: number;
  nextDueDate: number;
  fullPayment: number;
  arrears?: boolean;
  date: Date;
  initialValue?: number;
}

export function CardConsolidatedCredit(props: ICardConsolidatedCreditProps) {
  const {
    onUpdateTotal,
    title,
    code,
    expiredValue,
    nextDueDate,
    fullPayment,
    arrears,
    date = new Date(),
    initialValue,
  } = props;

  const [isRadioSelected, setIsRadioSelected] = useState(initialValue || false);
  const [selectedValue, setSelectedValue] = useState<number | null>(
    initialValue || null
  );
  const radioRefs = useRef<HTMLInputElement[]>([]);

  const paymentOptions = [
    {
      label: dataConsolidatedCredit.expiredValue,
      value: expiredValue,
    },
    {
      label: dataConsolidatedCredit.nextDueDate,
      value: nextDueDate,
      date: date,
    },
    {
      label: dataConsolidatedCredit.fullPayment,
      value: fullPayment,
    },
  ];

  const handleSelectionChange = (value: number) => {
    if (selectedValue !== value) {
      onUpdateTotal(selectedValue || 0, value);
      setSelectedValue(value);
    }
    setIsRadioSelected(true);
  };

  const handleClearSelection = () => {
    if (isRadioSelected && selectedValue !== null) {
      onUpdateTotal(selectedValue, 0);
      setSelectedValue(null);
      setIsRadioSelected(false);
      radioRefs.current.forEach((radio) => {
        if (radio) radio.checked = false;
      });
    }
  };

  return (
    <StyledContainer disabled={isRadioSelected}>
      <Stack direction="column" padding="16px 20px" gap="16px" width="256px">
        <Text type="label" size="large" weight="bold">
          {title}
        </Text>
        <Divider dashed />
        <Text type="body" size="medium" appearance="gray">
          {code}
        </Text>
        <Stack justifyContent="space-between">
          <Tag
            label={dataConsolidatedCredit.regularPayroll}
            appearance="gray"
            weight="strong"
          />
          {arrears && (
            <Tag
              label={dataConsolidatedCredit.arrears}
              appearance="danger"
              weight="strong"
            />
          )}
        </Stack>
        <Stack direction="column" gap="8px">
          {paymentOptions.map((option, index) => (
            <StyledInput
              key={index}
              onClick={() => radioRefs.current[index]?.click()}
            >
              <Stack alignItems="center" justifyContent="space-between">
                <Stack>
                  <input
                    type="radio"
                    name={`paymentOption-${code}`}
                    ref={(el) => (radioRefs.current[index] = el!)}
                    onChange={() => handleSelectionChange(option.value)}
                  />
                  <Stack direction="column">
                    <Text type="label" size="medium" weight="bold">
                      {option.label}
                    </Text>
                    {option.date && (
                      <Text type="body" size="small" appearance="gray">
                        {formatPrimaryDate(option.date)}
                      </Text>
                    )}
                  </Stack>
                </Stack>
                <Text type="body" size="small" appearance="gray">
                  {currencyFormat(option.value)}
                </Text>
              </Stack>
            </StyledInput>
          ))}
        </Stack>
        <Stack justifyContent="space-between" alignItems="end">
          <Button
            children="Desmarcar"
            iconBefore={<MdClear />}
            variant="outlined"
            appearance={isRadioSelected ? "primary" : "gray"}
            spacing="compact"
            onClick={handleClearSelection}
          />
          <Text type="title" size="medium" weight="bold" appearance="gray">
            {currencyFormat(selectedValue || 0)}
          </Text>
        </Stack>
      </Stack>
    </StyledContainer>
  );
}

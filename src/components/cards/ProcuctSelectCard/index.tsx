import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Fieldset } from "@components/data/Fieldset";

import { currencyFormat } from "@utils/formatData/currency";

import { selectData } from "./config";

export interface IProductSelectCardProps {
  amount: number;
  rate: number;
  term: number;
  description: string;
  disabled?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}

export function ProductSelectCard(props: IProductSelectCardProps) {
  const { amount, rate, term, description, disabled, onSelect, isSelected } =
    props;

  return (
    <Stack width="100%" direction="column">
      <Stack gap="4px">
        <input
          type="checkbox"
          disabled={disabled}
          checked={isSelected}
          onChange={onSelect}
        />
        <Text
          type="title"
          size="medium"
          appearance={disabled ? "gray" : "dark"}
        >
          {description}
        </Text>
      </Stack>
      <Fieldset
        isClickable={!disabled}
        selectedState={isSelected}
        onSelectionChange={onSelect}
      >
        <Stack direction="column" gap="16px" padding="4px 16px">
          <Stack justifyContent="space-between">
            <Text
              appearance={disabled ? "gray" : "dark"}
              type="label"
              size="large"
              weight="bold"
            >
              {selectData.amount}
            </Text>
            <Text appearance="gray" size="medium">
              <Text as="span" appearance="primary" size="small" weight="bold">
                ${" "}
              </Text>
              {currencyFormat(amount, false)}
            </Text>
          </Stack>
          <Stack justifyContent="space-between">
            <Text
              appearance={disabled ? "gray" : "dark"}
              type="label"
              size="large"
              weight="bold"
            >
              {selectData.rate}
            </Text>
            <Text appearance="gray" size="medium">
              {rate} % M.V
            </Text>
          </Stack>
          <Stack justifyContent="space-between">
            <Text
              appearance={disabled ? "gray" : "dark"}
              type="label"
              size="large"
              weight="bold"
            >
              {selectData.term}
            </Text>
            <Text appearance="gray" size="medium">
              {term} {selectData.months}
            </Text>
          </Stack>
        </Stack>
      </Fieldset>
    </Stack>
  );
}

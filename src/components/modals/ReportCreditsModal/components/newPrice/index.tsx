import { Stack } from "@inubekit/inubekit";
import { Text } from "@inubekit/text";

import { currencyFormat } from "@utils/formatData/currency";

interface INewPriceProps {
  value: number;
  label: string;
}

export function NewPrice(props: INewPriceProps) {
  const { value, label } = props;

  return (
    <Stack direction="column" alignItems="center">
      <Text type="headline" size="small" appearance="gray">
        ${currencyFormat(value, false)}
      </Text>
      <Text appearance="gray">{label}</Text>
    </Stack>
  );
}

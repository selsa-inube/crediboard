import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";

interface INewPriceProps {
  value: number | undefined;
  label: string;
}

export function NewPrice(props: INewPriceProps) {
  const { value, label } = props;

  return (
    <Stack direction="column" alignItems="center">
      <Text type="headline" size="small" appearance="gray">
        $ {value}
      </Text>
      <Text appearance="gray">{label}</Text>
    </Stack>
  );
}

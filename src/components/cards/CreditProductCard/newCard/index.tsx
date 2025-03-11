import { MdOutlineAdd } from "react-icons/md";
import { Icon } from "@inubekit/inubekit";
import { Text } from "@inubekit/text";
import { Stack } from "@inubekit/inubekit";

import { StyledCreditProductCard } from "../styles";
import { dataNewCard } from "./config";

interface INewCreditProductCardProps {
  onClick: () => void;
}

export function NewCreditProductCard(props: INewCreditProductCardProps) {
  const { onClick } = props;

  return (
    <StyledCreditProductCard onClick={onClick} $new={true}>
      <Stack direction="column" alignItems="center" margin="auto">
        <Icon icon={<MdOutlineAdd />} appearance="gray" size="45px" />
        <Text type="body" size="large" appearance="gray">
          {dataNewCard.add}
        </Text>
      </Stack>
    </StyledCreditProductCard>
  );
}

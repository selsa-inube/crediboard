import { MdOutlineEdit } from "react-icons/md";
import { Text } from "@inubekit/text";
import { Stack } from "@inubekit/stack";
import { Icon } from "@inubekit/icon";
import { Container, IconWrapper } from "./styles";

export interface ObligationCardProps {
  items: { title: string; amount: string }[];
  showIcon?: boolean;
}

function ObligationCard({ items, showIcon = true }: ObligationCardProps) {
  return (
    <Container>
      {items.map((item, index) => (
        <Stack key={index} direction="column" margin="4px" padding="0px 10px">
          <Text size="small" padding="0px 0px 3px">
            {item.title}
          </Text>
          <Text size="large" weight="bold" appearance="dark">
            {item.amount}
          </Text>
        </Stack>
      ))}
      {showIcon && (
        <IconWrapper>
          <Icon
            appearance="primary"
            icon={<MdOutlineEdit />}
            cursorHover
            size="24px"
          />
        </IconWrapper>
      )}
    </Container>
  );
}

export default ObligationCard;

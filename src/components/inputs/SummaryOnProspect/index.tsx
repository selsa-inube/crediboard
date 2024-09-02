import { MdOutlineEdit } from "react-icons/md";
import { Text } from "@inubekit/text";
import { Stack } from "@inubekit/stack";
import { Icon } from "@inubekit/icon";
import { currencyFormat } from "@utils/formatData/currency";
import { Container, IconWrapper, ContentWrapper } from "./styles";

export interface SummaryProspectProps {
  items: { title: string; amount: string }[];
  showIcon?: boolean;
  onIconClick?: () => void;
}

const parseCunstomFormat = (amount: string) => {
  const amountParsed = parseFloat(amount);
  return amount === "0" || !amountParsed  ? "$ 0" : currencyFormat(amountParsed);
}

function SummaryProspect(props: SummaryProspectProps) {
  const { items, showIcon = true, onIconClick } = props;

  return (
    <Container>
      <ContentWrapper>
        {items.map((item, index) => (
          <Stack key={index} direction="column" margin="4px" padding="0px 10px">
            <Text size="small" weight="bold" type="body" appearance="gray" padding="0px 0px 3px" ellipsis>
              {item.title}
            </Text>
            <Text size="large" weight="bold" appearance="dark" type="body">
              { parseCunstomFormat(item.amount) }
            </Text>
          </Stack>
        ))}
      </ContentWrapper> 
      {showIcon && (
        <IconWrapper onClick={onIconClick}>
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

export default SummaryProspect;

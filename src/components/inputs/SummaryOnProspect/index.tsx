import { MdOutlineEdit } from "react-icons/md";
import { Text } from "@inubekit/text";
import { Stack } from "@inubekit/stack";
import { Icon } from "@inubekit/icon";
import { inube } from "@inube/design-system";
import { parseCunstomFormat } from "@utils/formatData/currency";
import { Container, IconWrapper, ContentWrapper } from "./styles";

export interface SummaryProspectProps {
  items: { title: string; amount: string }[];
  showIcon?: boolean;
  onIconClick?: () => void;
}

export function SummaryProspect(props: SummaryProspectProps) {
  const { items, showIcon = true, onIconClick } = props;

  return (
    <Container $showIcon={showIcon}>
      <ContentWrapper>
        {items.map((item, index) => (
          <Stack
            key={index}
            direction="column"
            margin={inube.spacing.s050}
            padding={ `${inube.spacing.s0} ${inube.spacing.s150}` }
            gap={inube.spacing.s025}
          >
            <Text
              size="small"
              weight="bold"
              type="body"
              appearance="gray"
              padding= { `${inube.spacing.s0} ${inube.spacing.s0} ${inube.spacing.s050}` }
              ellipsis
            >
              {item.title}
            </Text>
            <Text size="large" weight="bold" appearance="dark" type="body">
              {parseCunstomFormat(item.amount)}
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

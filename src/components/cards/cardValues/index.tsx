import { MdOutlineEdit } from "react-icons/md";
import { Text } from "@inubekit/text";
import { Stack } from "@inubekit/stack";
import { Icon } from "@inubekit/icon";

import { parseCunstomFormat } from "@utils/formatData/currency";
import {
  Container,
  IconWrapper,
  ContentWrapper,
  StyledHorizontalDivider,
  StyledText,
} from "./styles";

export interface CardValuesProps {
  items: {
    title: string;
    amount: string;
    operation?: string;
    miniIcon?: boolean;
    icon?: React.ReactNode;
  }[];
  isMobile: boolean;
  onIconClick?: () => void;
  showIcon?: boolean;
  showSummaryFirstItem?: boolean;
}

export function CardValues(props: CardValuesProps) {
  const {
    items,
    onIconClick,
    isMobile,
    showIcon = true,
    showSummaryFirstItem,
  } = props;

  return (
    <Container $showIcon={showIcon}>
      <ContentWrapper>
        {items.map((item, index) => (
          <Stack alignItems="center" key={index}>
            <Stack
              direction="column"
              margin="4px"
              padding="0px 12px"
              gap="2px"
              alignItems={showIcon ? "start" : "center"}
            >
              <Text
                size="small"
                weight="bold"
                type="body"
                appearance="gray"
                padding="0px 0px 4px"
                ellipsis
              >
                {item.title}
              </Text>
              <Stack gap="8px" alignItems="center">
                <Text size="large" weight="bold" appearance="dark" type="body">
                  {parseCunstomFormat(item.amount)}
                </Text>
                {item.miniIcon && (
                  <Icon
                    appearance="primary"
                    icon={item.icon}
                    cursorHover
                    size="16px"
                  />
                )}
              </Stack>
            </Stack>
            {!isMobile && (
              <Stack>
                {item.operation && (
                  <StyledText $left={showSummaryFirstItem}>
                    <Text type="title" size="large" appearance="gray">
                      {item.operation}
                    </Text>
                  </StyledText>
                )}
                {item.title === "Neto a girar" && (
                  <StyledHorizontalDivider $left={showSummaryFirstItem} />
                )}
              </Stack>
            )}
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

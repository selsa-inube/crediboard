import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";

import { StyledContainerCardInfo } from "./styles";

interface CardInfoContainerProps {
  title: string;
  children: JSX.Element | JSX.Element[];
  isMobile?: boolean;
  icon?: React.JSX.Element;
  heightCardInfoContainer?: string;
}

export const CardInfoContainer = (props: CardInfoContainerProps) => {
  const {
    title,
    children,
    isMobile,
    icon,
    heightCardInfoContainer = "100%",
  } = props;

  return (
    <Stack direction="column" width="-webkit-fill-available">
      <Stack gap="8px" alignItems="center">
        <Icon
          icon={icon}
          appearance="primary"
          size={isMobile ? "40px" : "56px"}
        />
        <Text
          type="title"
          size={isMobile ? "medium" : "large"}
          appearance="primary"
          ellipsis
        >
          {title}
        </Text>
      </Stack>

      <StyledContainerCardInfo
        $containerHeight={heightCardInfoContainer}
        $isMobile={isMobile}
      >
        {children}
      </StyledContainerCardInfo>
    </Stack>
  );
};

import { Icon, Stack, Text, inube, useMediaQuery } from "@inube/design-system";

import { StyledContainerCardInfo } from "./styles";

interface CardInfoContainerProps {
  title: string;
  children: JSX.Element | JSX.Element[];
  icon?: React.JSX.Element;
  heightCardInfoContainer?: string;
}

export const CardInfoContainer = (props: CardInfoContainerProps) => {
  const {
    title,
    children,

    icon,
    heightCardInfoContainer = "auto",
  } = props;

  const isMobile = useMediaQuery("(max-width: 720px)");

  return (
    <Stack direction="column" width="-webkit-fill-available">
      <Stack gap={inube.spacing.s100} alignItems="center">
        <Icon icon={icon} appearance="primary" size="56px" />
        <Text type="title" appearance="primary" ellipsis>
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

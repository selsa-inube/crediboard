import { Stack, Text, inube, Icon } from "@inube/design-system";

import { StyledContainerCardInfo } from "./styles";

interface CardInfoContainerProps {
  title: string;
  children: JSX.Element | JSX.Element[];
  aspectRatio?: string;
  icon?: React.JSX.Element;
  heightCardInfoContainer?: string;
}

export const CardInfoContainer = (props: CardInfoContainerProps) => {
  const {
    title,
    children,
    aspectRatio,
    icon,
    heightCardInfoContainer = "auto",
  } = props;

  return (
    <Stack direction="column" width="-webkit-fill-available">
      <Stack gap={inube.spacing.s100} alignItems="center">
        <Icon icon={icon} appearance="primary" size="56px" />
        <Text type="title" appearance="primary" ellipsis>
          {title}
        </Text>
      </Stack>

      <StyledContainerCardInfo
        $aspectRatio={aspectRatio}
        $containerHeight={heightCardInfoContainer}
      >
        {children}
      </StyledContainerCardInfo>
    </Stack>
  );
};

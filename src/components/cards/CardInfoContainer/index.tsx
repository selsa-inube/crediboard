import { Stack, Text, inube, Icon } from "@inube/design-system";

import { StyledContainerCardInfo } from "./styles";

interface CardInfoContainerProps {
  title: string;
  children: JSX.Element | JSX.Element[];
  isMobile?: boolean;
  aspectRatio?: string;
  icon?: React.JSX.Element;
  heightCardInfoContainer?: string;
}

export const CardInfoContainer = (props: CardInfoContainerProps) => {
  const {
    title,
    children,
    isMobile,
    aspectRatio,
    icon,
    heightCardInfoContainer = "auto",
  } = props;

  return (
    <Stack direction="column" width="-webkit-fill-available">
      <Stack gap={inube.spacing.s100} alignItems="center">
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
        $aspectRatio={aspectRatio}
        $containerHeight={heightCardInfoContainer}
        $isMobile={isMobile}
      >
        {children}
      </StyledContainerCardInfo>
    </Stack>
  );
};

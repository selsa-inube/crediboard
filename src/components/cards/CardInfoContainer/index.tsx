import { Stack, Text, inube, Icon } from "@inube/design-system";

import { StyledContainerCardInfo } from "./styles";

interface CardInfoContainerProps {
  title: string;
  children: JSX.Element | JSX.Element[];
  aspectRatio?: string;
  icon?: React.JSX.Element;
  heigthCardInfoContainer?: string;
}

export const CardInfoContainer = (props: CardInfoContainerProps) => {
  const {
    title,
    children,
    aspectRatio,
    icon,
    heigthCardInfoContainer = "auto",
  } = props;

  return (
    <Stack
      direction="column"
      width="-webkit-fill-available"
      height={heigthCardInfoContainer}
    >
      <Stack gap={inube.spacing.s100} alignItems="center">
        <Icon icon={icon} appearance="primary" size="56px" cursorHover />
        <Text type="title" appearance="primary" ellipsis>
          {title}
        </Text>
      </Stack>

      <StyledContainerCardInfo $aspectRatio={aspectRatio}>
        {children}
      </StyledContainerCardInfo>
    </Stack>
  );
};

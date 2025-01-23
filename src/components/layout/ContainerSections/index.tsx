import { Stack } from "@inubekit/stack";

import { StyledContainerToCenter } from "./styles";
interface IContainerSectionsProps {
  children?: JSX.Element | JSX.Element[];
  stockTray: JSX.Element;
  isMobile?: boolean;
}

export const ContainerSections = (props: IContainerSectionsProps) => {
  const { children, stockTray, isMobile } = props;

  return (
    <StyledContainerToCenter>
      <Stack
        width={isMobile ? "-webkit-fill-available" : "min(100%,1440px)"}
        direction="column"
      >
        {stockTray}
        <Stack direction="column">{children}</Stack>
      </Stack>
    </StyledContainerToCenter>
  );
};

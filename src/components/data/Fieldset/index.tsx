import { MdAdd } from "react-icons/md";
import { useMediaQuery } from "@inubekit/hooks";
import { Text } from "@inubekit/text";
import { Stack } from "@inubekit/stack";
import { Button } from "@inubekit/button";
import { StyledContainerFieldset } from "./styles";

interface IPtionsButton {
  title: string;
  onClick?: () => void;
}

interface IFieldsetProps {
  title: string;
  children: JSX.Element | JSX.Element[];
  aspectRatio?: string;
  heightFieldset?: string;
  descriptionTitle?: string;
  activeButton?: IPtionsButton;
  hasTable?: boolean;
  hasOverflow?: boolean;
}

export const Fieldset = (props: IFieldsetProps) => {
  const {
    children,
    title,
    heightFieldset = "auto",
    aspectRatio,
    descriptionTitle,
    activeButton,
    hasTable = false,
    hasOverflow,
  } = props;

  const isMobile = useMediaQuery("(max-width:880px)");

  return (
    <Stack
      direction="column"
      gap="8px"
      width="-webkit-fill-available"
      height={!isMobile ? heightFieldset : "auto"}
    >
      <Stack justifyContent={activeButton && "space-between"}>
        <Stack gap={isMobile ? "12px" : "8px"}>
          <Text
            type="title"
            appearance="gray"
            size={isMobile ? "medium" : "large"}
          >
            {`${title} `}
          </Text>
          {descriptionTitle && (
            <Text type="title" ellipsis size={isMobile ? "medium" : "large"}>
              {descriptionTitle}
            </Text>
          )}
        </Stack>
        {activeButton && (
          <Stack>
            <Button
              iconBefore={<MdAdd />}
              spacing="compact"
              onClick={activeButton.onClick}
            >
              {activeButton.title}
            </Button>
          </Stack>
        )}
      </Stack>
      <StyledContainerFieldset
        $aspectRatio={aspectRatio}
        $isMobile={isMobile}
        $hasTable={hasTable}
        $hasOverflow={hasOverflow}
      >
        {children}
      </StyledContainerFieldset>
    </Stack>
  );
};

import { useState } from "react";
import { MdAdd } from "react-icons/md";
import { useMediaQuery } from "@inubekit/hooks";
import { Text } from "@inubekit/text";
import { Stack } from "@inubekit/stack";
import { Button } from "@inubekit/button";

import { StyledContainerFieldset } from "./styles";

interface IOptionsButton {
  title: string;
  onClick?: () => void;
}

interface IFieldsetProps {
  children: JSX.Element | JSX.Element[];
  title?: string;
  aspectRatio?: string;
  heightFieldset?: string;
  descriptionTitle?: string;
  activeButton?: IOptionsButton;
  hasTable?: boolean;
  hasOverflow?: boolean;
  slim?: boolean;
  isMobile?: boolean;
  isClickable?: boolean;
}

export const Fieldset = (props: IFieldsetProps) => {
  const {
    children,
    title,
    heightFieldset,
    aspectRatio,
    descriptionTitle,
    activeButton,
    hasTable = false,
    hasOverflow,
    isClickable,
  } = props;

  const isMobile = useMediaQuery("(max-width:880px)");

  const [isSelected, setIsSelected] = useState(false);

  const handleOnClick = () => {
    if (isClickable) {
      setIsSelected(!isSelected);
    }
    return;
  };

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
            {title}
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
        $hasOverflow={hasOverflow}
        $hasTable={hasTable}
        onClick={handleOnClick}
        $isSelected={isSelected}
      >
        {children}
      </StyledContainerFieldset>
    </Stack>
  );
};

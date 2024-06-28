import { MdAdd } from "react-icons/md";

import { Button, Stack, Text, inube } from "@inube/design-system";

import { StyledContainerFieldset } from "./styles";

interface IPtionsButton {
  title: string;
  onClick?: () => void;
}

interface IFieldsetProps {
  title: string;
  children: JSX.Element | JSX.Element[];
  isMobile?: boolean;
  aspectRatio?: string;
  heightFieldset?: string;
  descriptionTitle?: string;
  activeButton?: IPtionsButton;
}

export const Fieldset = (props: IFieldsetProps) => {
  const {
    children,
    title,
    isMobile,
    heightFieldset = "auto",
    aspectRatio,
    descriptionTitle,
    activeButton,
  } = props;

  return (
    <Stack
      direction="column"
      gap={inube.spacing.s100}
      width="-webkit-fill-available"
      height={heightFieldset}
    >
      <Stack justifyContent={activeButton && "space-between"}>
        <Stack gap={isMobile ? inube.spacing.s150 : inube.spacing.s100}>
          <Text
            type="title"
            appearance="gray"
            size={isMobile ? "medium" : "large"}
          >
            {`${title} `}
          </Text>
          <Text type="title" ellipsis size={isMobile ? "medium" : "large"}>
            {descriptionTitle}
          </Text>
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
      <StyledContainerFieldset $aspectRatio={aspectRatio} $isMobile={isMobile}>
        {children}
      </StyledContainerFieldset>
    </Stack>
  );
};

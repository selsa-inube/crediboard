import { MdAdd } from "react-icons/md";

import { Button, Stack, Text, inube } from "@inube/design-system";

import { StyledContainerFieldset } from "./styles";

interface IPtionsButton {
  title: string;
  onClick?: () => void;
}

interface IFieldsetProps {
  title: string;
  descriptionTitle?: string;
  children: JSX.Element | JSX.Element[];
  activeButton?: IPtionsButton;
}

export const Fieldset = (props: IFieldsetProps) => {
  const { children, title, descriptionTitle, activeButton } = props;

  return (
    <Stack
      direction="column"
      gap={inube.spacing.s100}
      width="-webkit-fill-available"
    >
      <Stack justifyContent={activeButton && "space-between"}>
        <Stack gap={inube.spacing.s100}>
          <Text type="title" appearance="gray">
            {`${title} `}
          </Text>
          <Text type="title" ellipsis>
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
      <StyledContainerFieldset>{children}</StyledContainerFieldset>
    </Stack>
  );
};

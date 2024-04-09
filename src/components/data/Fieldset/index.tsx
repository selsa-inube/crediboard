import { Stack, Text } from "@inube/design-system";

import { StyledContainerFieldset } from "./styles";

interface IFieldsetProps {
  title: string;
  descriptionTitle?: string;
  children: JSX.Element | JSX.Element[];
  direction?: "row" | "column";
}

export const Fieldset = (props: IFieldsetProps) => {
  const { children, title, descriptionTitle, direction = "row" } = props;

  return (
    <Stack direction="column" gap="8px">
      <Stack padding="s0 s200" gap="4px 8px">
        <Text type="title" appearance="gray">
          {`${title} `}
        </Text>
        <Text type="title">{descriptionTitle}</Text>
      </Stack>
      <StyledContainerFieldset>
        <Stack direction={direction}>{children}</Stack>
      </StyledContainerFieldset>
    </Stack>
  );
};

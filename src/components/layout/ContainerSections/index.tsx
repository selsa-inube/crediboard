import { MdArrowBack } from "react-icons/md";
import { Button, Stack, inube } from "@inube/design-system";

import { configButtons } from "./config";
import { StyledHorizontalDivider } from "./styles";

interface IContainerSectionsProps {
  children?: JSX.Element | JSX.Element[];
}

export const ContainerSections = (props: IContainerSectionsProps) => {
  const { children } = props;
  return (
    <Stack width="-webkit-fill-available" direction="column">
      <Stack direction="column">
        <Stack justifyContent="start" margin="s0 s0 s250">
          <Button spacing="compact" variant="none" iconBefore={<MdArrowBack />}>
            Volver
          </Button>
        </Stack>
        <Stack justifyContent="end" gap={inube.spacing.s200}>
          <Stack gap={inube.spacing.s400}>
            <Button>{configButtons.buttons.buttonOne.label}</Button>
            <Button>{configButtons.buttons.buttonTwo.label}</Button>
            <Button>{configButtons.buttons.buttonTree.label}</Button>
          </Stack>
          <StyledHorizontalDivider />
          <Stack gap={inube.spacing.s200}>
            <Button variant="outlined">
              {configButtons.buttonsOutlined.buttonOne.label}
            </Button>
            <Button variant="outlined">
              {configButtons.buttonsOutlined.buttonTwo.label}
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="column">{children}</Stack>
    </Stack>
  );
};

import { MdArrowBack } from "react-icons/md";

import { Button, Stack } from "@inube/design-system";
import { StyledHorizontalRule } from "./styles";

interface IContainerSectionsProps {
  children?: JSX.Element | JSX.Element[];
}

export const ContainerSections = (props: IContainerSectionsProps) => {
  const { children } = props;
  return (
    <Stack width="-webkit-fill-available" direction="column">
      <Stack direction="column">
        <Button spacing="compact" variant="none" iconBefore={<MdArrowBack />}>
          Volver
        </Button>
        <Stack justifyContent="end" gap="32px">
          <Stack gap="16px">
            <Button>Rechazar</Button>
            <Button>Anular</Button>
            <Button>Imprimir</Button>
          </Stack>
          <StyledHorizontalRule />
          <Stack gap="16px">
            <Button variant="outlined">Adjuntar</Button>
            <Button variant="outlined">Ver Adjuntos</Button>
          </Stack>
        </Stack>
      </Stack>
      <Stack>{children}</Stack>
    </Stack>
  );
};

import {
  Button,
  Blanket,
  Stack,
  Text,
  inube,
  Icon,
  useMediaQuery,
} from "@inube/design-system";
import { MdClose } from "react-icons/md";

import { StyledBackdropBlanket, StyledModal } from "./styles";

interface ILogoutModalProps {
  handleShowBlanket: () => void;
  logoutPath: string;
}

function LogoutModal(props: ILogoutModalProps) {
  const { logoutPath, handleShowBlanket } = props;
  const isSmallScreen = useMediaQuery("(max-width: 743px)");

  return (
    <StyledBackdropBlanket>
      <Blanket>
        <StyledModal $isSmallScreen={isSmallScreen}>
          <Stack direction="column" gap={inube.spacing.s300} padding="s300">
            <Stack direction="column" gap={inube.spacing.s300}>
              <Stack justifyContent="space-between">
                <Text type="title" size={isSmallScreen ? "small" : "medium"}>
                  Cerrar sesión
                </Text>
                <Icon
                  appearance="dark"
                  icon={<MdClose />}
                  size={isSmallScreen ? "20px" : "24px"}
                  onClick={handleShowBlanket}
                />
              </Stack>

              <Text size={isSmallScreen ? "small" : "large"} appearance="gray">
                ¿Realmente quieres cerrar sesión?
              </Text>
            </Stack>
            <Stack justifyContent="flex-end" gap={inube.spacing.s200}>
              <Button
                appearance="gray"
                spacing={isSmallScreen ? "compact" : "wide"}
                onClick={handleShowBlanket}
              >
                Cancelar
              </Button>
              <Button
                appearance="primary"
                spacing={isSmallScreen ? "compact" : "wide"}
                onClick={handleShowBlanket}
                type="link"
                path={logoutPath}
              >
                Cerrar sesión
              </Button>
            </Stack>
          </Stack>
        </StyledModal>
      </Blanket>
    </StyledBackdropBlanket>
  );
}

export { LogoutModal };
export type { ILogoutModalProps };

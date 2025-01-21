import { MdClose } from "react-icons/md";
import { Text } from "@inubekit/text";
import { Stack } from "@inubekit/stack";
import { Icon } from "@inubekit/icon";

import { StyledMenu, StyledMenuItem } from "./styles";

interface MobileMenuProps {
  onClose: () => void;
  onReject: () => void;
  onCancel: () => void;
  onAttach: () => void;
  onViewAttachments: () => void;
}

function MobileMenu(props: MobileMenuProps) {
  const { onClose, onReject, onCancel, onAttach, onViewAttachments } = props;

  return (
    <StyledMenu>
      <Stack justifyContent="space-between" alignItems="center">
        <Text appearance="dark" size="small" type="headline">
          Menú
        </Text>
        <Icon
          icon={<MdClose />}
          appearance="dark"
          size="24px"
          onClick={onClose}
        />
      </Stack>
      <StyledMenuItem onClick={onReject}>
        <Text appearance="dark" size="medium" type="body">
          Rechazar
        </Text>
      </StyledMenuItem>
      <StyledMenuItem onClick={onCancel}>
        <Text appearance="dark" size="medium" type="body">
          Anular
        </Text>
      </StyledMenuItem>
      <StyledMenuItem>
        <Text appearance="dark" size="medium" type="body">
          Imprimir
        </Text>
      </StyledMenuItem>
      <StyledMenuItem onClick={onAttach}>
        <Text appearance="dark" size="medium" type="body">
          Adjuntar
        </Text>
      </StyledMenuItem>
      <StyledMenuItem onClick={onViewAttachments}>
        <Text appearance="dark" size="medium" type="body">
          Ver Adjuntos
        </Text>
      </StyledMenuItem>
    </StyledMenu>
  );
}

export { MobileMenu };
export type { MobileMenuProps };

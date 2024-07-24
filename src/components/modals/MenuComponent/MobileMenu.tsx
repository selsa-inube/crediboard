import { Text } from "@inube/design-system";
import { Stack } from "@inubekit/stack";
import { Icon } from "@inubekit/icon";
import { MdClose } from "react-icons/md";

import {
  StyledMenu,
  StyledMenuItem,
} from "./styles";

interface MenuComponentProps {
  onClose: () => void;
  onReject: () => void;
  onCancel: () => void;
  onAttach: () => void;
  onViewAttachments: () => void;
}

function MenuComponent(props: MenuComponentProps) {
  return (
    <StyledMenu>
      <Stack justifyContent="space-between" alignItems="center">
        <Text appearance="dark" size="small" type="headline">
          Menú
        </Text>
          <Icon icon={<MdClose />} appearance="dark" size="24px" onClick={props.onClose}/>
      </Stack>
      <StyledMenuItem onClick={props.onReject}>
        <Text appearance="dark" size="medium" type="body" >
          Rechazar
        </Text>
      </StyledMenuItem>
      <StyledMenuItem onClick={props.onCancel}>
        <Text appearance="dark" size="medium" type="body">
          Anular
        </Text>
      </StyledMenuItem>
      <StyledMenuItem>
        <Text appearance="dark" size="medium" type="body">
          Imprimir
        </Text>
      </StyledMenuItem>
      <StyledMenuItem onClick={props.onAttach}>
        <Text appearance="dark" size="medium" type="body">
          Adjuntar
        </Text>
      </StyledMenuItem>
      <StyledMenuItem onClick={props.onViewAttachments}>
        <Text appearance="dark" size="medium" type="body">
          Ver Adjuntos
        </Text>
      </StyledMenuItem>
    </StyledMenu>
  );
}

export default MenuComponent;

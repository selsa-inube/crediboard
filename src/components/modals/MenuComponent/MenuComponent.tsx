import React from "react";
import { Text } from "@inube/design-system";
import { Icon } from "@inubekit/icon";
import {
  StyledMenu,
  StyledMenuHeader,
  StyledCloseIcon,
  StyledMenuItem,
} from "./MenuComponentStyles";
import { MdClose } from "react-icons/md";

interface MenuComponentProps {
  onClose: () => void;
  onReject: () => void;
  onCancel: () => void;
  onAttach: () => void;
  onViewAttachments: () => void;
}

const MenuComponent: React.FC<MenuComponentProps> = ({
  onClose,
  onReject,
  onCancel,
  onAttach,
  onViewAttachments,
}) => (
  <StyledMenu>
    <StyledMenuHeader>
      <Text appearance="dark" size="small" type="headline">
        Menú
      </Text>
      <StyledCloseIcon onClick={onClose}>
        <Icon icon={<MdClose />} appearance="dark" size="24px" />
      </StyledCloseIcon>
    </StyledMenuHeader>
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

export default MenuComponent;

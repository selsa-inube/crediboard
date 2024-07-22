import React from "react";
import { Text } from "@inube/design-system";
import {
  StyledMenu,
  StyledMenuHeader,
  StyledCloseIcon,
  StyledMenuItem,
} from "./MenuComponentStyles";

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
      <Text appearance="dark" size="large">
        Menú
      </Text>
      <StyledCloseIcon onClick={onClose}>&#x2716;</StyledCloseIcon>
    </StyledMenuHeader>
    <StyledMenuItem onClick={onReject}>Rechazar</StyledMenuItem>
    <StyledMenuItem onClick={onCancel}>Anular</StyledMenuItem>
    <StyledMenuItem>Imprimir</StyledMenuItem>
    <StyledMenuItem onClick={onAttach}>Adjuntar</StyledMenuItem>
    <StyledMenuItem onClick={onViewAttachments}>Ver Adjuntos</StyledMenuItem>
  </StyledMenu>
);

export default MenuComponent;

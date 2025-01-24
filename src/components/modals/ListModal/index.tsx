import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";

import { Blanket } from "@inubekit/blanket";
import { Button } from "@inubekit/button";
import { Text } from "@inubekit/text";
import { Stack } from "@inubekit/stack";
import { useMediaQuery } from "@inubekit/hooks";
import { Icon } from "@inubekit/icon";
import { Divider } from "@inubekit/divider";

import {
  StyledContainerClose,
  StyledContainerContent,
  StyledModal,
} from "./styles";

export interface IOptionButtons {
  label: string;
  variant: "filled" | "outlined" | "none";
  icon?: React.JSX.Element;
  fullwidth?: boolean;
  onClick?: () => void;
}

export interface IListModalProps {
  title: string;
  handleClose: () => void;
  handleSubmit?: () => void;
  onSubmit?: () => void;
  buttonLabel: string;
  cancelButton?: string;
  appearanceCancel?:
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "help"
    | "dark"
    | "gray"
    | "light";
  portalId?: string;
  content?: JSX.Element | JSX.Element[] | string;
  optionButtons?: IOptionButtons;
}

export const ListModal = (props: IListModalProps) => {
  const {
    title,
    portalId,
    content,
    optionButtons,
    cancelButton,
    appearanceCancel = "primary",
    handleClose,
    handleSubmit,
    onSubmit,
    buttonLabel,
  } = props;

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  const isMobile = useMediaQuery("(max-width: 700px)");

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack alignItems="center" justifyContent="space-between">
          <Text type="headline" size="small">
            {title}
          </Text>
          <StyledContainerClose onClick={handleClose}>
            <Stack alignItems="center" gap="8px">
              <Text>Cerrar</Text>
              <Icon
                icon={<MdClear />}
                size="24px"
                cursorHover
                appearance="dark"
              />
            </Stack>
          </StyledContainerClose>
        </Stack>
        <Divider />
        <StyledContainerContent $smallScreen={isMobile}>
          {typeof content === "string" ? (
            <Stack>
              <Text>{content}</Text>
            </Stack>
          ) : (
            <StyledContainerContent $smallScreen={isMobile}>
              {content}
            </StyledContainerContent>
          )}
        </StyledContainerContent>
        {optionButtons && (
          <Button
            spacing="compact"
            iconBefore={optionButtons?.icon}
            variant={optionButtons?.variant}
            onClick={optionButtons?.onClick}
            fullwidth={optionButtons?.fullwidth}
            cursorHover
          >
            {optionButtons?.label + "prueba"}
          </Button>
        )}
        <Stack justifyContent="flex-end" margin="16px 0 0 0" gap="16px">
          {cancelButton && (
            <Button
              variant="outlined"
              onClick={handleSubmit}
              spacing="wide"
              appearance={appearanceCancel}
            >
              {cancelButton}
            </Button>
          )}
          <Button onClick={onSubmit ?? handleClose}>{buttonLabel}</Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node
  );
};

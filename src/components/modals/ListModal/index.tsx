import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import {
  Blanket,
  Button,
  Stack,
  Text,
  inube,
  useMediaQuery,
} from "@inube/design-system";
import { Icon } from "@inubekit/icon";
import { Divider } from "@inubekit/divider";

import {
  StyledContainerClose,
  StyledContainerContent,
  StyledModal,
  StyledContainerTitle,
} from "./styles";

export interface IOptionButtons {
  label: string;
  variant: "filled" | "outlined" | "none";
  icon?: React.ReactNode;
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
  appearanceCancel?: string;
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
        <StyledContainerTitle>
          <Text type="headline" size="small">
            {title}
          </Text>
          <StyledContainerClose onClick={handleClose}>
            <Stack alignItems="center" gap={inube.spacing.s100}>
              <Text>Cerrar</Text>
              <Icon
                icon={<MdClear />}
                size="24px"
                cursorHover
                appearance="dark"
              />
            </Stack>
          </StyledContainerClose>
        </StyledContainerTitle>
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
            {optionButtons?.label}
          </Button>
        )}
        <Stack justifyContent="flex-end" gap="16px">
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

import { Stack, useMediaQuery, Blanket, Text, Button, inube } from "@inube/design-system";
import { createPortal } from "react-dom";
import { MdClear, MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { Textfield } from "@inubekit/textfield";
import { StyledModal, StyledContainerClose, StyledContainerTitle } from "./styles";

interface FormValues {
  field1: string;
  field2: string;
  field3: string;
}

export interface PromissoryNotesModalProps {
  title: string;
  handleClose: () => void;
  onSubmit: () => void;
  buttonText: string;
  portalId?: string;
  formValues: FormValues;
}

export function PromissoryNotesModal(props: PromissoryNotesModalProps) {
  const {
    title,
    buttonText,
    portalId = "portal",
    formValues,
    handleClose,
    onSubmit,
  } = props;

  const node = document.getElementById(portalId);
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
                appearance="dark"
                icon={<MdClear />}
                size="24px"
                cursorHover
              />
            </Stack>
          </StyledContainerClose>
        </StyledContainerTitle>
        <Stack gap={inube.spacing.s300} direction="column">
          <Textfield
            id="field1"
            value={formValues.field1}
            label="Correo"
            iconBefore={
              <MdOutlineEmail color={inube.color.stroke.dark.regular} />
            }
            placeholder="usuario@inube.com"
            disabled
            fullwidth
          />
          <Textfield
            id="field2"
            value={formValues.field2}
            label="Teléfono"
            iconBefore={
              <MdOutlinePhone color={inube.color.stroke.dark.regular} />
            }
            placeholder="3122638128"
            disabled
            fullwidth
          />
          <Textfield
            id="field3"
            value={formValues.field3}
            label="Whatsapp"
            iconBefore={
              <MdOutlinePhone color={inube.color.stroke.dark.regular} />
            }
            placeholder="3122638128"
            disabled
            fullwidth
          />
        </Stack>
        <Stack justifyContent="flex-end" margin="s200 s0">
          <Button type="button" onClick={onSubmit}>
            {buttonText}
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node
  );
}
import { createPortal } from "react-dom";
import { MdClear, MdRefresh } from "react-icons/md";
import { Blanket, Button, Stack, Text, inube, useMediaQuery } from "@inube/design-system";
import { Icon } from "@inubekit/icon";

import {
  StyledContainerClose,
  StyledContainerContent,
  StyledModal,
  StyledContainerTitle,
  StyledContainerSection,
  StyledContainerValue,
  StyledSection,
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
  onSubmit?: () => void;
  portalId?: string;
  content?: JSX.Element | JSX.Element[] | string;
  optionButtons?: IOptionButtons;
  buttonLabel?: string; // Asegúrate de incluir buttonLabel aquí
}

export const ListModal = (props: IListModalProps) => {
  const { title, portalId, handleClose, onSubmit, buttonLabel } = props;

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

        <StyledContainerContent $smallScreen={isMobile}>
          <StyledContainerSection>
            <StyledSection>
              <Text>Cupo máximo según capacidad de pago</Text>
              <StyledContainerValue>$ 20'000.000</StyledContainerValue>
            </StyledSection>
            <StyledSection>
              <Text>Cupo máximo por reciprocidad</Text>
              <StyledContainerValue>$ 14'000.000</StyledContainerValue>
            </StyledSection>
            <StyledSection>
              <Text>Cupo máximo por reciprocidad</Text>
              <StyledContainerValue>$ 25'000.000</StyledContainerValue>
            </StyledSection>
            <StyledSection>
              <Text>Cupo individual asignado</Text>
              <StyledContainerValue>$ 0</StyledContainerValue>
            </StyledSection>
          </StyledContainerSection>

          <StyledContainerSection>
            <Text type="caption" size="small" color={inube.colors.lighten.primary[400]}>
              El menor de los anteriores es su cupo máximo utilizable.
            </Text>
          </StyledContainerSection>

          <StyledContainerSection>
            <StyledSection>
              <Text>Cupo máximo utilizable</Text>
              <StyledContainerValue>$ 14'000.000</StyledContainerValue>
            </StyledSection>
            <StyledSection>
              <Text>Cartera vigente</Text>
              <StyledContainerValue>$ 4'000.000</StyledContainerValue>
            </StyledSection>
            <StyledSection>
              <Text>Cupo disponible sin garantía</Text>
              <StyledContainerValue $highlight>
                $ 10'000.000
              </StyledContainerValue>
            </StyledSection>
          </StyledContainerSection>

          {/* Botón de actualización */}
          <Stack justifyContent="center" margin="s200 s0">
            <Button
              iconBefore={<MdRefresh />}
              variant="filled"
              onClick={onSubmit ?? handleClose}
            >
              {buttonLabel}
            </Button>
          </Stack>
        </StyledContainerContent>
      </StyledModal>
    </Blanket>,
    node
  );
};

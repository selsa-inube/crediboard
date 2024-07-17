import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdArrowBack,
  MdMenu,
  MdOutlineRemoveRedEye,
  MdOutlineThumbUp,
} from "react-icons/md";
import { Button, Icon, Stack, Text, inube, useMediaQuery } from "@inube/design-system";
import { Flag } from "@inubekit/flag";

import { TextAreaModal } from "@components/modals/TextAreaModal";
import { configButtons, configDataAttachments } from "./config";
import { StyledHorizontalDivider, StyledItem, StyledMessageContainer } from "./styles";
import { Listmodal } from "@components/modals/Listmodal";

interface IContainerSectionsProps {
  children?: JSX.Element | JSX.Element[];
}

interface IListdataProps {
  data: { id: string; name: string }[];
}

const Listdata: React.FC<IListdataProps> = ({ data }) => (
  <ul style={{ paddingInlineStart: "2px", marginBlock: "8px" }}>
    {data.map((element) => (
      <StyledItem key={element.id}>
        <Text>{element.name}</Text>
        <Icon
          icon={<MdOutlineRemoveRedEye />}
          appearance="dark"
          spacing="none"
          size="24px"
          cursorHover
        />
      </StyledItem>
    ))}
  </ul>
);

export const ContainerSections: React.FC<IContainerSectionsProps> = ({
  children,
}) => {
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [attachDocuments, setAttachDocuments] = useState(false);
  const isMobile: boolean = useMediaQuery("(max-width: 720px)");
  const [showFlagMessage, setShowFlagMessage] = useState(false);
  const [flagMessage, setFlagMessage] = useState({ title: '', description: '' });

  const navigation = useNavigate();

  const handleRejectionModal = () => setShowRejectionModal(!showRejectionModal);
  const handleCancelModal = () => setShowCancelModal(!showCancelModal);

  const handleConfirmCancel = () => {
    const isSuccess = true;

    if (isSuccess) {
      setFlagMessage({
        title: "Anulación",
        description: "Se ha realizado la anulación exitosamente",
      });
    } else {
      setFlagMessage({
        title: "Error",
        description: "No se pudo realizar la anulación",
      });
    }

    setShowFlagMessage(true);
    setShowCancelModal(false);
  };

  const handleCloseFlagMessage = () => {
    setShowFlagMessage(false);
  };

  return (
    <>
      <Stack width="-webkit-fill-available" direction="column">
        <Stack direction="column">
          <Stack justifyContent="space-between" margin="s0 s0 s250">
            {!isMobile ? (
              <Button
                spacing="compact"
                variant="none"
                iconBefore={<MdArrowBack />}
                onClick={() => navigation(-1)}
              >
                Volver
              </Button>
            ) : (
              <Stack alignItems="center">
                <Icon
                  icon={<MdArrowBack />}
                  appearance="primary"
                  size="32px"
                  spacing="none"
                  onClick={() => navigation(-1)}
                />
                <Text>Volver</Text>
              </Stack>
            )}
            {isMobile && (
              <Icon icon={<MdMenu />} appearance="dark" size="32px" spacing="none" />
            )}
          </Stack>
          {!isMobile && (
            <Stack justifyContent="end" gap={inube.spacing.s200} margin="s0 s0 s200 s0">
              <Stack gap={inube.spacing.s400}>
                <Button onClick={handleRejectionModal}>
                  {configButtons.buttons.buttonOne.label}
                </Button>
                <Button onClick={handleCancelModal}>
                  {configButtons.buttons.buttonTwo.label}
                </Button>
                <Button>{configButtons.buttons.buttonTree.label}</Button>
              </Stack>
              <StyledHorizontalDivider />
              <Stack gap={inube.spacing.s200}>
                <Button variant="outlined">
                  {configButtons.buttonsOutlined.buttonOne.label}
                </Button>
                <Button variant="outlined" onClick={() => setAttachDocuments(true)}>
                  {configButtons.buttonsOutlined.buttonTwo.label}
                </Button>
                {attachDocuments && (
                  <Listmodal
                    title="Ver Adjuntos"
                    content={<Listdata data={configDataAttachments} />}
                    handleClose={() => setAttachDocuments(false)}
                  />
                )}
              </Stack>
            </Stack>
          )}
        </Stack>
        <Stack direction="column">{children}</Stack>
      </Stack>
      {showRejectionModal && (
        <TextAreaModal
          title="Rechazar"
          buttonText="Confirmar"
          inputLabel="Motivo del rechazo."
          inputPlaceholder="Describa el motivo del rechazo."
          onCloseModal={handleRejectionModal}
          onSubmit={handleRejectionModal}
        />
      )}
      {showCancelModal && (
        <TextAreaModal
          title="Anular"
          buttonText="Confirmar"
          inputLabel="Motivo de la anulación."
          inputPlaceholder="Describa el motivo de la anulación."
          onCloseModal={handleCancelModal}
          onSubmit={handleConfirmCancel}
        />
      )}
      {showFlagMessage && (
        <StyledMessageContainer>
          <Flag
            appearance="success"
            closeFlag={handleCloseFlagMessage}
            description={flagMessage.description}
            duration={4000}
            icon={<MdOutlineThumbUp />}
            title={flagMessage.title}
            isMessageResponsive={false}
          />
        </StyledMessageContainer>
      )}
    </>
  );
};



import { useNavigate } from "react-router-dom";
import { MdArrowBack, MdOutlineRemoveRedEye } from "react-icons/md";
import { Button, Icon, Stack, Text, inube } from "@inube/design-system";
import { useState } from "react";

import { TextAreaModal } from "@components/modals/TextAreaModal";

import { configButtons, configDataAttachments } from "./config";
import { StyledHorizontalDivider, StyledItem } from "./styles";
import { Listmodal } from "@components/modals/Listmodal";

interface IContainerSectionsProps {
  children?: JSX.Element | JSX.Element[];
}

interface IListdataProps {
  data: { id: string; name: string }[];
}

const Listdata = (props: IListdataProps) => {
  const { data } = props;

  return (
    <ul
      style={{
        paddingInlineStart: "2px",
        marginBlock: "8px",
      }}
    >
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
};

export const ContainerSections = (props: IContainerSectionsProps) => {
  const { children } = props;
  const [showRejectionModal, setShowRejectionModal] = useState(false);

  const [showAttachmentsModal, setShowAttachmentsModal] = useState(false);

  const handleToggleRejectModal = () => {
    setShowRejectionModal(!showRejectionModal);
  };

  const handleSubmitRejectModal = () => {
    setShowRejectionModal(!showRejectionModal);
  };

  const navigation = useNavigate();

  return (
    <>
      <Stack width="-webkit-fill-available" direction="column">
        <Stack direction="column">
          <Stack justifyContent="start" margin="s0 s0 s250">
            <Button
              spacing="compact"
              variant="none"
              iconBefore={<MdArrowBack />}
              onClick={() => navigation(-1)}
            >
              Volver
            </Button>
          </Stack>
          <Stack justifyContent="end" gap={inube.spacing.s200}>
            <Stack gap={inube.spacing.s400}>
              <Button onClick={handleToggleRejectModal}>
                {configButtons.buttons.buttonOne.label}
              </Button>
              <Button>{configButtons.buttons.buttonTwo.label}</Button>
              <Button>{configButtons.buttons.buttonTree.label}</Button>
            </Stack>
            <StyledHorizontalDivider />
            <Stack gap={inube.spacing.s200}>
              <Button variant="outlined">
                {configButtons.buttonsOutlined.buttonOne.label}
              </Button>
              <Button
                variant="outlined"
                onClick={() => setShowAttachmentsModal(true)}
              >
                {configButtons.buttonsOutlined.buttonTwo.label}
              </Button>
              {showAttachmentsModal && (
                <Listmodal
                  title="Ver Adjuntos"
                  content={<Listdata data={configDataAttachments} />}
                  handleClose={() => setShowAttachmentsModal(false)}
                />
              )}
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="column">{children}</Stack>
      </Stack>
      {showRejectionModal && (
        <TextAreaModal
          title="Rechazar"
          buttonText="Confirmar"
          inputLabel="Motivo del rechazo."
          inputPlaceholder="Describa el motivo del rechazo."
          onCloseModal={handleToggleRejectModal}
          onSubmit={handleSubmitRejectModal}
        />
      )}
    </>
  );
};

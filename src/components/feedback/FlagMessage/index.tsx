import React, { useState } from "react";
import { Stack } from "@inubekit/stack";
import { Flag } from "@inubekit/flag";
import { MdOutlineThumbUp } from "react-icons/md";
import { StyledMessageContainer } from "./styles";
import { TextAreaModal, TextAreaModalProps } from "@components/modals/TextAreaModal";

interface IFlagMessageProps {
  handleCloseMessage: () => void;
  onMessageClosed: () => void;
}

const FlagMessage: React.FC<IFlagMessageProps> = ({
  handleCloseMessage,
  onMessageClosed,
}) => {
  const [showModal, setShowModal] = useState(false); 


  const closeMessageAndExecuteCallback = () => {
    handleCloseMessage();
    onMessageClosed();
  };


  const modalProps: TextAreaModalProps = {
    title: "Título de la Modal",
    buttonText: "Confirmar",
    inputLabel: "Motivo de la anulación.",
    inputPlaceholder: "Describa el motivo de la anulación.",
    onCloseModal: () => setShowModal(false),
    onSubmit: () => {
      setShowModal(false); 
    },
  };

  return (
    <>
      <StyledMessageContainer>
        <Stack justifyContent="flex-end" width="100%">
          <Flag
            appearance={"success"}
            closeFlag={closeMessageAndExecuteCallback}
            description={"Se a realizado la anulacion"}
            duration={4000}
            icon={<MdOutlineThumbUp/>}
            title={"Notificacion"}
            isMessageResponsive={false}
          />
        </Stack>
      </StyledMessageContainer>
      {showModal && <TextAreaModal {...modalProps} />}
    </>
  );
};

export { FlagMessage };
export type { IFlagMessageProps };

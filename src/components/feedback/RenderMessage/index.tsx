import React, { useState } from "react";
import { Stack } from "@inubekit/stack";
import { Flag } from "@inubekit/flag";
import { StyledMessageContainer } from "./styles";
import { IUserMessage } from "./types";
import { TextAreaModal, TextAreaModalProps } from "@components/modals/TextAreaModal";

interface IRenderMessageProps {
  message: IUserMessage;
  handleCloseMessage: () => void;
  onMessageClosed: () => void;
}

const RenderMessage: React.FC<IRenderMessageProps> = ({
  message,
  handleCloseMessage,
  onMessageClosed,
}) => {
  const [showModal, setShowModal] = useState(false); 

  if (!message.visible || !message.data) return null;

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
            appearance={message.data.appearance as "dark"}
            closeFlag={closeMessageAndExecuteCallback}
            description={message.data.description}
            duration={4000}
            icon={message.data.icon}
            title={message.data.title}
            isMessageResponsive={false}
          />
        </Stack>
      </StyledMessageContainer>
      {showModal && <TextAreaModal {...modalProps} />}
    </>
  );
};

export { RenderMessage };
export type { IRenderMessageProps };

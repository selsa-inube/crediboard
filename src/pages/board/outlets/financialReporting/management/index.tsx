import React, { useState, useEffect } from "react";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/Stack";
import { Textfield } from "@inubekit/textfield";
import { LuPaperclip } from "react-icons/lu";
import localforage from "localforage";
import { useParams } from "react-router-dom";
 
import { Fieldset } from "@components/data/Fieldset";
import { Message } from "@components/message";
import { SubmitButton } from '@components/feedback/SubmitButton'

import { ManagementContainer, ChatContent } from "./styles";
 
interface MessageType {
  type: "sent" | "received";
  timestamp: number;
  text: string;
}
 
export const Management: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const { id } = useParams<{ id: string }>();
 
  useEffect(() => {
    if (id) {
      localforage
        .getItem<MessageType[]>(`messages_${id}`)
        .then((savedMessages) => {
          if (savedMessages) {
            setMessages(savedMessages);
          }
        })
        .catch((err) => {
          console.error("Error al cargar mensajes:", err);
        });
    }
  }, [id]);
 
  useEffect(() => {
    if (id) {
      localforage.setItem(`messages_${id}`, messages).catch((err) => {
        console.error("Error al guardar mensajes:", err);
      });
    }
  }, [messages, id]);
 
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage();
  };
 
  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMsg: MessageType = {
        type: "sent",
        timestamp: Date.now(),
        text: newMessage,
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };
 
  return (
    <Fieldset title="Gestión" heigthFieldset="340px" aspectRatio="1">
      <ManagementContainer>
        <ChatContent>
          {messages.map((msg, index) => (
            <Message key={index} type={msg.type} timestamp={msg.timestamp}>
              {msg.text}
            </Message>
          ))}
        </ChatContent>
        <form onSubmit={handleFormSubmit}>
          <Stack direction="row" gap="8px" alignItems="center">
            <Icon
              appearance="primary"
              cursorHover
              size="36px"
              icon={<LuPaperclip />}
            />
            <Textfield
              id="text"
              placeholder="Ej.: Escriba su mensaje"
              fullwidth
              value={newMessage}
              onChange={handleInputChange}
            />
            <SubmitButton/>
          </Stack>
        </form>
      </ManagementContainer>
    </Fieldset>
  );
};
 
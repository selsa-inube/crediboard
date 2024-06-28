import { useState, useEffect } from "react";
import { Icon } from "@inubekit/icon";
import { Stack , inube} from "@inube/design-system";

import { Textfield } from "@inubekit/textfield";
import { LuPaperclip } from "react-icons/lu";
import localforage from "localforage";
import { useParams } from "react-router-dom";
 
import { Fieldset } from "@components/data/Fieldset";
import { Message } from "@components/data/message";
import { SubmitButton } from "@components/inputs/SubmitButton";
 
import { ManagementContainer, ChatContent } from "./styles";
 
interface MessageType {
  id: string;
  type: "sent" | "received";
  timestamp: number;
  text: string;
}
 
export const Management = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { id } = useParams<{ id: string }>();
 
  useEffect(() => {
    localforage
      .getItem<MessageType[]>("messages")
      .then((savedMessages) => {
        if (savedMessages) {
          setMessages(savedMessages);
        }
      })
      .catch((err) => {
        console.error("Error al cargar mensajes:", err);
      });
  }, []);
 
  useEffect(() => {
    localforage.setItem("messages", messages).catch((err) => {
      console.error("Error al guardar mensajes:", err);
    });
  }, [messages]);
 
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage();
  };
 
  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMsg: MessageType = {
        id: id ?? "default",
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
 
  const filteredMessages = messages.filter((msg) => msg.id === id);
 
  return (
    <Fieldset title="Gestión" heigthFieldset="340px" aspectRatio="1">
      <ManagementContainer>
        <ChatContent>
          {filteredMessages.map((msg, index) => (
            <Message key={index} type={msg.type} timestamp={msg.timestamp}>
              {msg.text}
            </Message>
          ))}
        </ChatContent>
        <form onSubmit={handleFormSubmit}>
        <Stack alignItems="center" direction="row" gap={inube.spacing.s150}>
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
            <SubmitButton />
          </Stack>
        </form>
      </ManagementContainer>
    </Fieldset>
  );
};
 
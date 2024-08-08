import { useState, useEffect } from "react";
import { Icon } from "@inubekit/icon";
import { Stack, inube, useMediaQuery } from "@inube/design-system";
import { Textfield } from "@inubekit/textfield";
import { LuPaperclip } from "react-icons/lu";
import localforage from "localforage";
import { useParams } from "react-router-dom";

import { Fieldset } from "@components/data/Fieldset";
import { Message } from "@components/data/Message";
import { SubmitButton } from "@components/inputs/SubmitButton";

import { ChatContent } from "./styles";
import { get } from "@mocks/utils/dataMock.service";
import { traceMock } from "@src/mocks/financialReporting/trace.mock";

interface MessageType {
  id: string;
  type: "sent" | "received";
  timestamp: number | string;
  text: string;
}

interface MessageTypedos {
  id: string;
  trace: typeof traceMock.trace;
}

export const Management = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    get("trace").then((data) => {
      const trace = (data as MessageTypedos[])[0].trace;
      const message: MessageType[] = trace.map((trace) => ({
        id: trace.trace_id,
        type: "sent",
        timestamp: trace.execution_date,
        text: trace.justification,
      }));

      setMessages(message);
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

  const isMobile = useMediaQuery("(max-width: 720px)");

  return (
    <Fieldset title="Gestión" heightFieldset="340px" aspectRatio="1">
      <Stack direction="column" height={!isMobile ? "100%" : "292px"}>
        <ChatContent>
          {filteredMessages.map((msg) => (
            <Message
              key={msg.id}
              type={msg.type}
              timestamp={msg.timestamp}
              message={msg.text}
            />
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
      </Stack>
    </Fieldset>
  );
};

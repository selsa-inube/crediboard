import { useState, useEffect } from "react";
import { Icon } from "@inubekit/icon";
import { Stack, inube, useMediaQuery } from "@inube/design-system";
import { Textfield } from "@inubekit/textfield";
import { LuPaperclip } from "react-icons/lu";
import { useParams } from "react-router-dom";

import { Fieldset } from "@components/data/Fieldset";
import { Message } from "@components/data/message";
import { SubmitButton } from "@components/inputs/SubmitButton";

import { ChatContent } from "./styles";
import { get, updateActive } from "@mocks/utils/dataMock.service";
import { traceMock } from "@src/mocks/trace/trace.mock";

interface MessageType {
  id: string;
  type: "sent" | "received";
  timestamp: number | string;
  text: string;
}

interface TraceType {
  trace_id: string;
  trace_value: string;
  credit_request_id: string;
  use_case: string;
  id: string;
  user_id: string;
  execution_date: string;
  justification: string;
  decision_taken_by_user: string;
  trace: typeof traceMock;
  trace_type: string;
  read_novelty: string;
  messages?: MessageType[];
}

export const Management = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    get("trace").then((data) => {
      if (Array.isArray(data)) {
        const trace = data.find(
          (trace: TraceType) => trace.credit_request_id === id
        );
        const message: MessageType[] = trace ? trace.messages || [] : [];
        setMessages(message);
      }
    });
  }, [id]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage();
  };

  const sendMessage = async () => {
    if (newMessage.trim() !== "") {
      const newMsg: MessageType = {
        id: crypto.randomUUID(),
        type: "sent",
        timestamp: Date.now(),
        text: newMessage,
      };
      setMessages((prevMessages) => [...prevMessages, newMsg]);

      const traceData = await get("trace");
      if (Array.isArray(traceData)) {
        const traceIndex = traceData.findIndex(
          (trace: TraceType) => trace.credit_request_id === id
        );
        if (traceIndex !== -1) {
          const updatedTrace = traceData[traceIndex];
          updatedTrace.messages = [...(updatedTrace.messages || []), newMsg];
          await updateActive({
            key: "trace_id",
            nameDB: "trace",
            identifier: updatedTrace.trace_id,
            editData: updatedTrace,
          });
        }
      }

      setNewMessage("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const isMobile = useMediaQuery("(max-width: 720px)");

  return (
    <Fieldset title="Gestión" heightFieldset="340px" aspectRatio="1">
      <Stack direction="column" height={!isMobile ? "100%" : "292px"}>
        <ChatContent>
          {messages.map((msg) => (
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

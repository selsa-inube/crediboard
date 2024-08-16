import { useState, useEffect } from "react";
import { Icon } from "@inubekit/icon";
import { Stack, inube } from "@inube/design-system";
import { Textfield } from "@inubekit/textfield";
import { LuPaperclip } from "react-icons/lu";
import localforage from "localforage";
import { MdOutlineSend } from "react-icons/md";

import { Fieldset } from "@components/data/Fieldset";
import { Message } from "@components/data/Message";
import { getDataById, updateActive } from "@mocks/utils/dataMock.service";
import { TraceType } from "@services/types";

import { ChatContent } from "./styles";

interface IManagementProps {
  id: string;
  isMobile: boolean;
  updateData: boolean;
}

export const Management = (props: IManagementProps) => {
  const { id, isMobile, updateData } = props;

  const [traces, setTraces] = useState<TraceType[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    getDataById<TraceType[]>("trace", "credit_request_id", id!).then((data) => {
      if (data) setTraces(data);
    });
  }, [updateData, id]);

  const handleFormSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const sendMessage = async () => {
    if (newMessage.trim() !== "") {
      const newTrace: TraceType = {
        trace_id: crypto.randomUUID(),
        trace_value: newMessage,
        credit_request_id: id ?? "default",
        use_case: "message",
        user_id: "user_001",
        execution_date: new Date().toISOString(),
      };

      const updatedTraces = [...traces, newTrace];
      setTraces(updatedTraces);

      try {
        await localforage.setItem("trace", updatedTraces);
        await updateActive({
          key: "trace_id",
          nameDB: "trace",
          identifier: newTrace.trace_id,
          editData: {
            trace_id: newTrace.trace_id,
            trace_value: newTrace.trace_value,
            credit_request_id: newTrace.credit_request_id,
            use_case: newTrace.use_case,
            user_id: newTrace.user_id,
            execution_date: newTrace.execution_date as string,
            justification: newTrace.justification ?? "",
            decision_taken_by_user: newTrace.decision_taken_by_user ?? "",
            trace_type: newTrace.trace_type ?? "",
            read_novelty: newTrace.read_novelty ?? "",
          },
        });
        setNewMessage("");
      } catch (err) {
        console.error("Error al guardar el mensaje:", err);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  console.log("traces", traces);

  return (
    <Fieldset title="Gestión" heightFieldset="340px" aspectRatio="1">
      <Stack direction="column" height={!isMobile ? "100%" : "292px"}>
        <ChatContent>
          {traces.map((trace) => (
            <Message
              key={trace.trace_id}
              type="sent"
              timestamp={trace.execution_date}
              message={trace.trace_value}
            />
          ))}
        </ChatContent>
        <form>
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
            <Stack>
              <Icon
                appearance="primary"
                cursorHover
                size="36px"
                icon={<MdOutlineSend />}
                onClick={handleFormSubmit}
              />
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Fieldset>
  );
};

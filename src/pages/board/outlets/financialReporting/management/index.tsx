import { useState, useEffect, useCallback } from "react";
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
import { ItemNotFound } from "@components/layout/ItemNotFound";
import userNotFound from "@assets/images/ItemNotFound.png";

import { ChatContent, SkeletonContainer, SkeletonLine } from "./styles";
import { errorObserver } from "../config";

interface IManagementProps {
  id: string;
  isMobile: boolean;
  updateData: boolean;
}

export const Management = (props: IManagementProps) => {
  const { id, isMobile, updateData } = props;

  const [traces, setTraces] = useState<TraceType[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!id) return;
  
    setLoading(true);
    setError(null);
  
    const timer = setTimeout(() => {
      setError(
        "No se pudo cargar la información. Intente nuevamente más tarde."
      );
      setLoading(false);
    }, 5000);
  
    try {
      const data = await getDataById<TraceType[]>(
        "trace",
        "credit_request_id",
        id
      );
  
      clearTimeout(timer);
  
      if (!data || (Array.isArray(data) && data.length === 0)) {
        setError("No se encontraron datos.");
      } else if (data instanceof Error) {
        errorObserver.notify({
          id: "Management",
          message: "Error al obtener los datos de gestión.",
        });
        setError("Error al obtener los datos de gestión.");
      } else {
        setTraces(data);
      }
    } catch (err) {
      clearTimeout(timer);
      errorObserver.notify({
        id: "Management",
        message: (err as Error).message.toString(),
      });
      setError("Error al intentar conectar con el servicio de trazabilidad.");
    } finally {
      setLoading(false);
    }
  }, [id]);
  

  useEffect(() => {
    fetchData();
  }, [fetchData, updateData]);

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

  const handleRetry = () => {
    setError(null);
    fetchData();
  };

  return (
    <Fieldset title="Gestión" heightFieldset="340px" aspectRatio="1">
      {error ? (
        <ItemNotFound
          image={userNotFound}
          title="Error al cargar datos"
          description={error}
          buttonDescription="Volver a intentar"
          route="#"
          onRetry={handleRetry}
        />
      ) : (
        <Stack direction="column" height={!isMobile ? "100%" : "292px"}>
          <ChatContent>
            {loading
              ? [...Array(5)].map((_, index) => (
                  <SkeletonContainer
                    key={index}
                    type={index % 2 === 0 ? "sent" : "received"}
                  >
                    <SkeletonLine width="30%" animated={true} />
                  </SkeletonContainer>
                ))
              : traces.map((trace) => (
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
      )}
    </Fieldset>
  );
};

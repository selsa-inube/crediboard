import { useState, useEffect, useCallback, useRef } from "react";
import { MdOutlineSend, MdAttachFile } from "react-icons/md";
import localforage from "localforage";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Textfield } from "@inubekit/textfield";

import { Fieldset } from "@components/data/Fieldset";
import { Message } from "@components/data/Message";
import { getById, updateActive } from "@mocks/utils/dataMock.service";
import { TraceType } from "@services/types";
import { ItemNotFound } from "@components/layout/ItemNotFound";
import userNotFound from "@assets/images/ItemNotFound.png";

import { traceObserver } from "../config";
import { ChatContent, SkeletonContainer, SkeletonLine } from "./styles";
import { errorObserver } from "../config";

interface IManagementProps {
  id: string;
  isMobile: boolean;
  updateData?: boolean;
}

export const Management = (props: IManagementProps) => {
  const { id, isMobile, updateData } = props;

  const [traces, setTraces] = useState<TraceType[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const chatContentRef = useRef<HTMLDivElement>(null); 

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
      const data = await getById<TraceType[]>(
        "trace",
        "credit_request_id",
        id,
        true
      );

      clearTimeout(timer);

      if (!data || (Array.isArray(data) && data.length === 0)) {
        errorObserver.notify({
          id: "Management",
          message: "Error al obtener los datos de gestión.",
        });
        setError("No se encontraron datos.");
      } else if (data instanceof Error) {
        setError("Error al obtener los datos de gestión.");
      } else {
        const flattenedData: TraceType[] = Array.isArray(data[0])
          ? ((data as TraceType[]).flat() as TraceType[])
          : (data as TraceType[]);

        setTraces(flattenedData);
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
    traceObserver.subscribe(fetchData);

    return () => {
      traceObserver.unsubscribe(fetchData);
    };
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData, updateData]);

  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight; 
    }
  }, [traces]);

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
    <Fieldset
      title="Gestión"
      heightFieldset="340px"
      aspectRatio={isMobile ? "auto" : "1"}
    >
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
          <ChatContent ref={chatContentRef}> 
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
            <Stack alignItems="center"  direction="row" gap="16px" margin="2px 4px">
              <Icon
                appearance="primary"
                cursorHover
                size="24px"
                icon={<MdAttachFile />}
              />
              <Textfield
                id="text"
                placeholder="Ej.: Escriba su mensaje"
                fullwidth
                value={newMessage}
                onChange={handleInputChange}
                size="compact"
              />
              <Icon
                appearance="primary"
                cursorHover
                size="24px"
                icon={<MdOutlineSend />}
                onClick={handleFormSubmit}
              />
            </Stack>
          </form>
        </Stack>
      )}
    </Fieldset>
  );
};

import { useState, useEffect, useCallback } from "react";
import { LuPaperclip } from "react-icons/lu";
import { MdOutlineSend } from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Textfield } from "@inubekit/textfield";

import { Fieldset } from "@components/data/Fieldset";
import { Message } from "@components/data/Message";
import { TraceType } from "@services/types";
import { ItemNotFound } from "@components/layout/ItemNotFound";
import userNotFound from "@assets/images/ItemNotFound.png";
import { getTraceByCreditRequestId } from "@services/trace/getTraceByCreditRequestId";

import { traceObserver, errorObserver } from "../config";
import { ChatContent, SkeletonContainer, SkeletonLine } from "./styles";

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
      const data = await getTraceByCreditRequestId("c6a6173d-01bc-4d79-b5cc-9a6132f47347").catch(
        () => {
          errorObserver.notify({
          id: "Management",
          message: "Error al obtener los datos de gestión.",
        });
        setError("No se encontraron datos.");
        }
      );

      clearTimeout(timer);

      if (data || (Array.isArray(data) && data.length > 0)) {
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

  const handleFormSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const sendMessage = async () => {
    if (newMessage.trim() !== "") {
      const newTrace: TraceType = {
        traceId: crypto.randomUUID(),
        traceValue: newMessage,
        creditRequestId: id ?? "default",
        useCase: "message",
        userId: "user_001",
        excecutionDate: new Date().toISOString(),
        traceType: "message",
        userName: "Usuario de Prueba",
      };

      const updatedTraces = [...traces, newTrace];
      setTraces(updatedTraces);

      try {
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
                    key={trace.traceId}
                    type="sent"
                    timestamp={trace.excecutionDate}
                    message={trace.traceValue}
                  />
                ))}
          </ChatContent>
          <form>
            <Stack alignItems="center" direction="row" gap="4px">
              <Icon
                appearance="primary"
                cursorHover
                size="24px"
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
                  size="24px"
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

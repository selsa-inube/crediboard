import { useState, useEffect, useCallback, useRef } from "react";
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
import { getCreditRequestByCode } from "@services/creditRequets/getCreditRequestByCode";
import { registerNewsToCreditRequest } from "@services/trace/registerNewsToCreditRequest";
import { Requests } from "@services/types";

import { traceObserver, errorObserver } from "../config";
import { ChatContent, SkeletonContainer, SkeletonLine } from "./styles";

interface IManagementProps {
  id: string;
  isMobile: boolean;
  updateData?: boolean;
}

export const Management = (props: IManagementProps) => {
  const { id, isMobile, updateData } = props;

  const [requests, setRequests] = useState<Requests | null>(null);
  const [traces, setTraces] = useState<TraceType[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const chatContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCreditRequest = async () => {
      try {
        const data = await getCreditRequestByCode(id);
        setRequests(data[0] as Requests);
      } catch (error) {
        console.error(error);
        errorObserver.notify({
          id: "Management",
          message: (error as Error).message.toString(),
        });
      }
    };

    if (id) {
      fetchCreditRequest();
    }
  }, [id]);

  const fetchData = useCallback(async () => {
    if (!requests?.creditRequestId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getTraceByCreditRequestId(requests.creditRequestId);
      if (data && Array.isArray(data)) {
        setTraces(data.flat());
      }
    } catch (err) {
      errorObserver.notify({
        id: "Management",
        message: (err as Error).message.toString(),
      });
      setError("Error al intentar conectar con el servicio de trazabilidad.");
    } finally {
      setLoading(false);
    }
  }, [requests?.creditRequestId]);

  useEffect(() => {
    fetchData();
  }, [fetchData, updateData]);

  useEffect(() => {
    traceObserver.subscribe(fetchData);
    return () => {
      traceObserver.unsubscribe(fetchData);
    };
  }, [fetchData]);

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
        traceId: crypto.randomUUID(),
        useCase: "Novelty",
        userName: "Usuario de Prueba",
        creditRequestId: requests?.creditRequestId,
        traceValue: newMessage,
        userId: "user_001",
        traceType: "Novelty",
        excecutionDate: new Date().toISOString(),
      };

      try {
        await registerNewsToCreditRequest(newTrace);
        setTraces((prevTraces) => [...prevTraces, newTrace]);
        setNewMessage("");
      } catch (error) {
        console.error("Error al enviar el mensaje:", error);
        errorObserver.notify({
          id: "Management",
          message: "Error al enviar el mensaje. Intente nuevamente.",
        });
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
                    key={trace.traceId}
                    type="sent"
                    timestamp={trace.excecutionDate}
                    message={trace.traceValue}
                  />
                ))}
          </ChatContent>
          <form>
            <Stack
              alignItems="center"
              direction="row"
              gap="16px"
              margin="2px 4px"
            >
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

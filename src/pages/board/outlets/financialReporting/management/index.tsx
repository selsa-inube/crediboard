import { useState, useEffect, useCallback, useRef } from "react";
import { MdOutlineSend, MdAttachFile } from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Textfield } from "@inubekit/textfield";

import { Fieldset } from "@components/data/Fieldset";
import { Message } from "@components/data/Message";
import { ITraceType } from "@services/types";
import { ItemNotFound } from "@components/layout/ItemNotFound";
import userNotFound from "@assets/images/ItemNotFound.png";
import { getTraceByCreditRequestId } from "@services/trace/getTraceByCreditRequestId";
import { getCreditRequestByCode } from "@services/creditRequets/getCreditRequestByCode";
import { registerNewsToCreditRequest } from "@services/trace/registerNewsToCreditRequest";
import { ICreditRequest } from "@services/types";

import { traceObserver, errorObserver } from "../config";
import { ChatContent, SkeletonContainer, SkeletonLine } from "./styles";

interface IManagementProps {
  id: string;
  isMobile: boolean;
  updateData?: boolean;
}

export const Management = ({ id, isMobile, updateData }: IManagementProps) => {
  const [creditRequest, setCreditRequest] = useState<ICreditRequest | null>(
    null
  );
  const [traces, setTraces] = useState<ITraceType[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const chatContentRef = useRef<HTMLDivElement>(null);

  const notifyError = useCallback((message: string) => {
    errorObserver.notify({ id: "Management", message });
  }, []);

  const fetchCreditRequest = useCallback(async () => {
    try {
      const data = await getCreditRequestByCode(id);
      setCreditRequest(data[0] as ICreditRequest);
    } catch (error) {
      console.error(error);
      notifyError((error as Error).message);
    }
  }, [id, notifyError]);

  useEffect(() => {
    if (id) fetchCreditRequest();
  }, [fetchCreditRequest, id]);

  const fetchData = useCallback(async () => {
    if (!creditRequest?.creditRequestId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getTraceByCreditRequestId(
        creditRequest.creditRequestId
      );
      setTraces(Array.isArray(data) ? data.flat() : []);
    } catch (err) {
      notifyError((err as Error).message);
      setError("Error al intentar conectar con el servicio de trazabilidad.");
    } finally {
      setLoading(false);
    }
  }, [creditRequest?.creditRequestId, notifyError]);

  useEffect(() => {
    fetchData();
  }, [fetchData, updateData]);

  useEffect(() => {
    traceObserver.subscribe(fetchData);
    return () => traceObserver.unsubscribe(fetchData);
  }, [fetchData]);

  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [traces]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const newTrace: ITraceType = {
      useCase: "Novelty",
      userName: "Usuario de Prueba",
      creditRequestId: creditRequest?.creditRequestId,
      traceValue: newMessage,
      userId: "user_001",
      traceType: "Novelty",
      decision_of_concept: "decision",
      excecutionDate: new Date().toISOString(),
    };

    try {
      await registerNewsToCreditRequest(newTrace);
      setTraces((prev) => [...prev, newTrace]);
      setNewMessage("");
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      notifyError("Error al enviar el mensaje. Intente nuevamente.");
    }
  };

  const handleFormSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleRetry = () => {
    setError(null);
    fetchData();
  };

  const renderSkeletons = () =>
    [...Array(5)].map((_, index) => (
      <SkeletonContainer
        key={index}
        type={index % 2 === 0 ? "sent" : "received"}
      >
        <SkeletonLine width="30%" animated={true} />
      </SkeletonContainer>
    ));

  const renderMessages = () =>
    traces.map((trace, index) => (
      <Message
        key={index}
        type="sent"
        timestamp={trace.excecutionDate}
        message={trace.traceValue}
      />
    ));

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
            {loading ? renderSkeletons() : renderMessages()}
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
                icon={<MdAttachFile />}
              />
              <Textfield
                id="text"
                placeholder="Ej.: Escriba su mensaje"
                fullwidth
                value={newMessage}
                onChange={handleInputChange}
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

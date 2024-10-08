import { useState, isValidElement, useEffect } from "react";
import {
  MdAddCircleOutline,
  MdOutlineCheckCircle,
  MdOutlineThumbUp,
} from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { Flag } from "@inubekit/flag";
import { Stack } from "@inubekit/stack";

import userNotFound from "@assets/images/ItemNotFound.png";
import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import { ItemNotFound } from "@components/layout/ItemNotFound";
import { IAction, IEntries, ITitle } from "@components/data/TableBoard/types";
import { getById } from "@mocks/utils/dataMock.service";
import { CreditRequest } from "@services/types";
import { addItem } from "@mocks/utils/dataMock.service";

import { traceObserver } from "../config";
import {
  dataButton,
  infoItems,
  maperDataRequirements,
  maperEntries,
} from "./config";
import { SeeDetailsModal } from "./SeeDetailsModal";
import { AprovalsModal } from "./AprovalsModal";
import { handleSuccess, handleError } from "./config";
import { StyledMessageContainer } from "../styles";
import { errorObserver } from "../config";

interface IRequirementsData {
  id: string;
  titlesRequirements: ITitle[];
  entriesRequirements: IEntries[];
  actionsMovile: IAction[];
}

export interface IRequirementsProps {
  isMobile: boolean;
  id: string;
  user: string;
}

export const Requirements = (props: IRequirementsProps) => {
  const { isMobile, id, user} = props;
  const [showSeeDetailsModal, setShowSeeDetailsModal] = useState(false);
  const [modalData, setModalData] = useState<{ date?: Date; details?: string }>(
    {}
  );
  const [showAprovalsModal, setShowAprovalsModal] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [showFlagMessage, setShowFlagMessage] = useState(false);
  const [flagMessage, setFlagMessage] = useState({
    title: "",
    description: "",
    appearance: "success" as "success" | "danger",
  });

  const [dataRequirements, setDataRequirements] = useState<IRequirementsData[]>(
    []
  );

  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const requirements = await getById<CreditRequest>(
          "requirements",
          "credit_request_id",
          id
        );

        if (!(requirements instanceof Error)) {
          const processedEntries = maperEntries(requirements);
          const processedRequirements = maperDataRequirements(processedEntries);

          setDataRequirements(processedRequirements);
        }
      } catch (error) {
        setError(true);
        errorObserver.notify({
          id: "Requirements",
          message: "Error al obtener los datos de los requisitos.",
        });
        console.error(error);
      }
    })();
  }, [id, error]);

  const toggleAprovalsModal = () => setShowAprovalsModal(!showAprovalsModal);
  const changeApprove = () => setIsApproved(!isApproved);

  const handleToggleSeeDetailsModal = (date?: string, details?: string) => {
    setModalData({
      date: date ? new Date(date) : undefined,
      details,
    });
    setShowSeeDetailsModal((prevState) => !prevState);
  };

  const handleSubmitAprovals = async (
    id: string,
    user: string,
    formData: { textarea: string },
    setFlagMessage: (message: {
      title: string;
      description: string;
      appearance: "success" | "danger";
    }) => void,
    setShowFlagMessage: (state: boolean) => void,
    setShowApprovalstModal: (state: boolean) => void
  ) => {
    const justificationText = formData.textarea;

    if (justificationText && id) {
      const trace = {
        trace_value: "Document approved",
        credit_request_id: id,
        use_case: "document_upload",
        user_id: user,
        execution_date: new Date().toISOString(),
        justification: justificationText,
        decision_taken_by_user: "approved",
        trace_type: "executed_task",
        read_novelty: "",
      };

      try {
        await addItem("trace", trace);
        traceObserver.notify(trace);
        handleSuccess(setFlagMessage, setShowFlagMessage, setShowApprovalstModal); 
      } catch (error) {
        handleError(error as Error, setFlagMessage, setShowFlagMessage, setShowApprovalstModal); 
      }
    }
  };

  const renderAddIcon = (entry: IEntries) => {
    const date = typeof entry.date === "string" ? entry.date : undefined;
    const details =
      typeof entry.details === "string" ? entry.details : undefined;

    return (
      <Stack justifyContent="center">
        <Icon
          icon={<MdAddCircleOutline />}
          appearance="primary"
          onClick={() => handleToggleSeeDetailsModal(date, details)}
          spacing="compact"
          size="24px"
          cursorHover
        />
      </Stack>
    );
  };

  const renderCheckIcon = (entry: IEntries) => (
    <Stack justifyContent="center">
      <Icon
        icon={<MdOutlineCheckCircle />}
        appearance="primary"
        spacing="compact"
        cursorHover
        size="24px"
        onClick={() => {
          setIsApproved(false);
          toggleAprovalsModal();
        }}
        disabled={
          isValidElement(entry?.tag) && entry?.tag?.props?.label === "No Cumple"
        }
      />
    </Stack>
  );

  const actionsRequirements: IAction[] = [
    { id: "agregar", content: renderAddIcon },
    { id: "aprobar", content: renderCheckIcon },
  ];

  return (
    <>
      <Stack>
        <Fieldset
          title="Requisitos"
          activeButton={dataButton}
          heightFieldset="340px"
          hasTable={!error}
          aspectRatio="1"
        >
          {error ? (
            <ItemNotFound
              image={userNotFound}
              title="Error al cargar datos"
              description={
                "Error al intentar conectar con el servicio de trazabilidad."
              }
              buttonDescription="Volver a intentar"
              route="#"
              onRetry={() => setError(false)}
            />
          ) : (
            dataRequirements.map((item, index) => (
              <TableBoard
                key={item.id}
                id={item.id}
                titles={item.titlesRequirements}
                entries={item.entriesRequirements}
                actions={actionsRequirements}
                actionMobile={item.actionsMovile}
                appearanceTable={{
                  widthTd: !isMobile ? "75%" : "70%",
                  efectzebra: true,
                  title: "primary",
                  isStyleMobile: true,
                }}
                isFirstTable={index === 0}
                infoItems={infoItems}
              />
            ))
          )}
        </Fieldset>
      </Stack>

      {showSeeDetailsModal && (
        <SeeDetailsModal
          date={modalData.date || new Date()}
          details={modalData.details || ""}
          onCloseModal={handleToggleSeeDetailsModal}
        />
      )}

      {showAprovalsModal && (
        <AprovalsModal
          title="Aprobaciones"
          buttonText="Confirmar"
          inputLabel="Observaciones de aprobación o rechazo"
          inputPlaceholder="Observaciones para la aprobación o rechazo."
          isApproved={isApproved}
          onCloseModal={toggleAprovalsModal}
          onChangeApprove={changeApprove}
          onSubmit={(values) =>
            handleSubmitAprovals(
              id!,
              user,
              values,
              setFlagMessage,
              setShowFlagMessage,
              setShowAprovalsModal
            )
          }
        />
      )}
      {showFlagMessage && (
        <StyledMessageContainer>
          <Flag
            title={flagMessage.title}
            description={flagMessage.description}
            appearance={flagMessage.appearance}
            icon={<MdOutlineThumbUp />}
            duration={5000}
            isMessageResponsive={false}
            closeFlag={() => setShowFlagMessage(false)}
          />
        </StyledMessageContainer>
      )}
    </>
  );
};

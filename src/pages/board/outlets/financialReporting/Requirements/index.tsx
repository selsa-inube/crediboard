import { useState, isValidElement, useEffect } from "react";
import { MdAddCircleOutline, MdOutlineCheckCircle } from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { useFlag } from "@inubekit/flag";
import { Stack } from "@inubekit/stack";

import userNotFound from "@assets/images/ItemNotFound.png";
import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import { ItemNotFound } from "@components/layout/ItemNotFound";
import { IAction, IEntries, ITitle } from "@components/data/TableBoard/types";
import { CreditRequest } from "@services/types";
import { addItem, getById } from "@mocks/utils/dataMock.service";

import { errorObserver, traceObserver } from "../config";
import {
  dataButton,
  infoItems,
  maperDataRequirements,
  maperEntries,
  getAcctionMobile,
} from "./config";
import { SeeDetailsModal } from "./SeeDetailsModal";
import { AprovalsModal } from "./AprovalsModal";

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
  const { isMobile, id, user } = props;
  const [showSeeDetailsModal, setShowSeeDetailsModal] = useState(false);
  const [modalData, setModalData] = useState<{ date?: Date; details?: string }>(
    {}
  );
  const [showAprovalsModal, setShowAprovalsModal] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [dataRequirements, setDataRequirements] = useState<IRequirementsData[]>(
    []
  );
  const [error, setError] = useState(false);

  const { addFlag } = useFlag();

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

  const renderAccion = getAcctionMobile(
    setShowSeeDetailsModal,
    setShowAprovalsModal
  );

  const toggleAprovalsModal = () => setShowAprovalsModal(!showAprovalsModal);
  const changeApprove = () => setIsApproved(!isApproved);

  const handleToggleSeeDetailsModal = (details?: string) => {
    setModalData({
      date: new Date(),
      details,
    });
    setShowSeeDetailsModal((prevState) => !prevState);
  };

  const handleSubmitAprovals = async (
    id: string,
    user: string,
    formData: { textarea: string }
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
        addFlag({
          title: "Éxito",
          description: "Documentación aprobada correctamente.",
          appearance: "success",
          duration: 5000,
        });
      } catch (error) {
        addFlag({
          title: "Error",
          description: "Ocurrió un error al aprobar el documento.",
          appearance: "danger",
          duration: 5000,
        });
      }
    }
  };

  const renderAddIcon = (entry: IEntries) => {
    const details =
      typeof entry.details === "string" ? entry.details : undefined;

    return (
      <Stack justifyContent="center">
        <Icon
          icon={<MdAddCircleOutline />}
          appearance="primary"
          onClick={() => handleToggleSeeDetailsModal(details)}
          spacing="compact"
          variant="empty"
          size="32px"
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
        size="32px"
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
      <Fieldset
        title="Requisitos"
        activeButton={dataButton}
        heightFieldset="100%"
        hasTable={!error}
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
              actionMobile={renderAccion}
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

      {showSeeDetailsModal && (
        <SeeDetailsModal
          date={modalData.date!}
          details=""
          onCloseModal={handleToggleSeeDetailsModal}
        />
      )}

      {showAprovalsModal && (
        <AprovalsModal
          isApproved={isApproved}
          onCloseModal={toggleAprovalsModal}
          onChangeApprove={changeApprove}
          onSubmit={(values) => handleSubmitAprovals(id!, user, values)}
        />
      )}
    </>
  );
};

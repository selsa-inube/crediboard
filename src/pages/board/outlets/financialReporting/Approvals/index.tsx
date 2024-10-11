import { useState, useEffect, useCallback } from "react";
import { Tag } from "@inubekit/tag";
import { Flag } from "@inubekit/flag";

import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import { IEntries } from "@components/data/TableBoard/types";
import { ListModal } from "@components/modals/ListModal";
import { TextAreaModal } from "@components/modals/TextAreaModal";
import { ItemNotFound } from "@components/layout/ItemNotFound";

import {
  actionMobileApprovals,
  titlesApprovals,
  actionsApprovals,
  handleNotificationClick,
  handleErrorClick,
  desktopActions,
  getMobileActionsConfig,
  infoItems,
} from "./config";
import { getById } from "@mocks/utils/dataMock.service";
import userNotFound from "@assets/images/ItemNotFound.png";

import { StyledMessageContainer } from "../styles";
import { errorObserver } from "../config";

const appearanceTag = (label: string) => {
  if (label === "Pendiente") {
    return "warning";
  }
  if (label === "Aprobado") {
    return "success";
  }
  return "danger";
};

interface IApprovalsProps {
  user: string;
  isMobile: boolean;
}

export const Approvals = (props: IApprovalsProps) => {
  const { user, isMobile } = props;
  const [entriesApprovals, setEntriesApprovals] = useState<IEntries[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [selectedData, setSelectedData] = useState<IEntries | null>(null);
  const [showFlag, setShowFlag] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showRetry, setShowRetry] = useState(false);

  const fetchApprovals = useCallback(() => {
    setLoading(true);
    setError(null);
    setShowRetry(false);

    getById("approval", "credit_request_id", user, true)
      .then((data) => {
        if (!data || data instanceof Error) {
          throw new Error("Error al obtener los datos de aprobaciones.");
        }
        if (Array.isArray(data)) {
          const entries = data.map((entry) => ({
            id: entry.approval_id.toString(),
            usuarios: entry.approver_name,
            error: entry.error,
            tag: (
              <Tag
                label={entry.concept}
                appearance={appearanceTag(entry.concept)}
                weight="strong"
              />
            ),
          }));
          setEntriesApprovals(entries);
          setLoading(false);
        } else {
          setEntriesApprovals([]);
          setError("No se encontraron datos.");
          setLoading(false);
          setShowRetry(true);
        }
      })
      .catch(() => {
        errorObserver.notify({
          id: "Approvals",
          message: "Error al conectar con el servicio de aprobaciones.",
        });
        setEntriesApprovals([]);
        setError("Error al intentar conectar con el servicio de aprobaciones.");
      });
  }, [user]);

  useEffect(() => {
    if (loading) {
      const retryTimer = setTimeout(() => {
        setShowRetry(true);
      }, 5000);

      return () => clearTimeout(retryTimer);
    } else {
      setShowRetry(false);
    }
  }, [loading]);

  useEffect(() => {
    fetchApprovals();
  }, [fetchApprovals]);

  const handleNotificationClickBound = (data: IEntries) => {
    handleNotificationClick(data, setSelectedData, setShowNotificationModal);
  };

  const handleErrorClickBound = (data: IEntries) => {
    handleErrorClick(data, setSelectedData, setShowErrorModal);
  };

  const desktopActionsConfig = desktopActions(
    actionsApprovals,
    handleNotificationClickBound,
    handleErrorClickBound
  );

  const mobileActions = getMobileActionsConfig(
    actionMobileApprovals,
    handleNotificationClickBound,
    handleErrorClickBound
  );

  const handleSubmit = () => {
    setShowFlag(true);
    setShowNotificationModal(false);
  };
  const handleCloseNotificationModal = () => {
    setShowNotificationModal(false);
  };

  const handleRetry = () => {
    fetchApprovals();
  };

  return (
    <>
      <Fieldset
        title="Aprobaciones"
        heightFieldset="277px"
        hasTable
        aspectRatio="1"
      >
        {showRetry ? (
          <ItemNotFound
            image={userNotFound}
            title="Error al cargar datos"
            description={error || "No se encontraron datos."}
            buttonDescription="Volver a intentar"
            route="/retry-path"
            onRetry={handleRetry}
          />
        ) : (
          <TableBoard
            id="usuarios"
            titles={titlesApprovals}
            entries={entriesApprovals}
            actions={desktopActionsConfig}
            actionMobile={mobileActions}
            loading={loading}
            appearanceTable={{
              widthTd: isMobile ? "70%" : undefined,
              efectzebra: true,
              title: "primary",
              isStyleMobile: true,
            }}
            isFirstTable={true}
            infoItems={infoItems}
          />
        )}
      </Fieldset>
      {showNotificationModal && selectedData && (
        <ListModal
          title="Notificación"
          content="¿Está seguro que desea enviar esta solicitud para aprobación? Se necesita evaluar esta solicitud."
          buttonLabel="Enviar"
          handleClose={handleCloseNotificationModal}
          onSubmit={handleSubmit}
        />
      )}
      {showFlag && (
          <StyledMessageContainer>
            <Flag
              id="flag1"
              title="Solicitud enviada"
              description="La solicitud ha sido enviada exitosamente para su aprobación."
              appearance="success"
              duration={5000}
            />
          </StyledMessageContainer>
      )}
      {showErrorModal && selectedData && (
        <TextAreaModal
          title="Error"
          buttonText="Cerrar"
          inputLabel="Descripción del error"
          inputPlaceholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec mollis felis. Donec eget sapien viverra, tincidunt ex ut, ornare nisi. Nulla eget fermentum velit."
          readOnly
          disableTextarea={true}
          onCloseModal={() => setShowErrorModal(false)}
        />
      )}
    </>
  );
};

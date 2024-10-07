import { useState, useEffect } from "react";
import { MdOutlineThumbUp } from "react-icons/md";
import { Flag } from "@inubekit/flag";

import userNotFound from "@assets/images/ItemNotFound.png";
import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import { IEntries } from "@components/data/TableBoard/types";
import { ListModal } from "@components/modals/ListModal";
import { TextAreaModal } from "@components/modals/TextAreaModal";
import { ItemNotFound } from "@components/layout/ItemNotFound";
import { useFetch } from "@utils/hooks/useFetch";

import { errorObserver } from "../config";
import { StyledMessageContainer } from "../styles";
import {
  actionMobileApprovals,
  titlesApprovals,
  actionsApprovals,
  handleNotificationClick,
  handleErrorClick,
  desktopActions,
  getMobileActionsConfig,
  infoItems,
  entriesApprovals,
  apiUrl,
} from "./config";
import { IApprovals } from "./types";

interface IApprovalsProps {
  user: string;
  isMobile: boolean;
}

export const Approvals = (props: IApprovalsProps) => {
  const { user, isMobile } = props;
  const [approvalsEntries, setApprovalsEntries] = useState<IEntries[]>([]);

  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [selectedData, setSelectedData] = useState<IEntries | null>(null);
  const [showFlag, setShowFlag] = useState(false);

  const [retryFlag, setRetryFlag] = useState(false);

  const { data, error, loading } = useFetch<IApprovals[]>(
    `${apiUrl.approvals}97a2c93e-69a1-46bc-9203-99be56cd5047`,
    retryFlag
  );

  useEffect(() => {
    if (data) {
      const entries: IEntries[] = entriesApprovals(data);
      setApprovalsEntries(entries);
    }

    if (error) {
      errorObserver.notify({
        id: "Approvals",
        message: error.toString(),
      });
    }
  }, [data, user, error]);

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
    console.log("retry");
    setRetryFlag((prev) => !prev);
  };

  return (
    <>
      <Fieldset
        title="Aprobaciones"
        heightFieldset="277px"
        hasTable
        aspectRatio="1"
      >
        {error ? (
          <ItemNotFound
            image={userNotFound}
            title="Error al cargar datos"
            description={error.toString() || "No se encontraron datos."}
            buttonDescription="Volver a intentar"
            route="/retry-path"
            onRetry={handleRetry}
          />
        ) : (
          <TableBoard
            id="usuarios"
            titles={titlesApprovals}
            entries={approvalsEntries}
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
            title="Solicitud enviada"
            description="La solicitud ha sido enviada exitosamente para su aprobación."
            appearance="success"
            duration={5000}
            icon={<MdOutlineThumbUp />}
            isMessageResponsive
            closeFlag={() => setShowFlag(false)}
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

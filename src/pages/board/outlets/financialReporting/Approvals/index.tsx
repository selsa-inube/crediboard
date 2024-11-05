import { useState, useEffect } from "react";

import { useFlag } from "@inubekit/flag";

import userNotFound from "@assets/images/ItemNotFound.png";
import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import { IEntries } from "@components/data/TableBoard/types";
import { ListModal } from "@components/modals/ListModal";
import { TextAreaModal } from "@components/modals/TextAreaModal";
import { ItemNotFound } from "@components/layout/ItemNotFound";
import { useFetch } from "@services/financialReporting/getApprovals/useFetch";
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
  optionsFetch,
} from "@config/pages/board/oulet/financialReporting/configApprovals";
import { enviroment } from "@config/environment";

import { errorObserver } from "../config";
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

  const [retryFlag, setRetryFlag] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { addFlag } = useFlag();

  const {
    data,
    error: fetchError,
    loading,
  } = useFetch<IApprovals[]>(
    `${enviroment.ICOREBANKING_API_URL_QUERY}/credit-requests/aprovals/97a2c93e-69a1-46bc-9203-99be56cd5047`,
    optionsFetch,
    retryFlag
  );

  useEffect(() => {
    if (data) {
      const entries: IEntries[] = entriesApprovals(data);
      setApprovalsEntries(entries);
    }

    if (fetchError) {
      errorObserver.notify({
        id: "Approvals",
        message: fetchError.toString(),
      });
      setError(fetchError.toString());
    }
  }, [data, user, fetchError]);

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
    addFlag({
      title: "Solicitud enviada",
      description:
        "La solicitud ha sido enviada exitosamente para su aprobación.",
      appearance: "success",
      duration: 5000,
    });
    setShowNotificationModal(false);
  };

  const handleCloseNotificationModal = () => {
    setShowNotificationModal(false);
  };

  const handleRetry = () => {
    setRetryFlag((prev) => !prev);
  };

  return (
    <>
      <Fieldset
        title="Aprobaciones"
        heightFieldset="277px"
        hasTable
        aspectRatio={isMobile ? "auto" : "1"}
      >
        {error ? (
          <ItemNotFound
            image={userNotFound}
            title="Error al cargar datos"
            description={error}
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

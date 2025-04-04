import { useState, useEffect, useCallback, useContext } from "react";
import { useFlag } from "@inubekit/inubekit";

import userNotFound from "@assets/images/ItemNotFound.png";
import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import { IEntries } from "@components/data/TableBoard/types";
import { ListModal } from "@components/modals/ListModal";
import { TextAreaModal } from "@components/modals/TextAreaModal";
import { ItemNotFound } from "@components/layout/ItemNotFound";
import { getCreditRequestByCode } from "@services/creditRequets/getCreditRequestByCode";
import { getAprovalsById } from "@services/financialReporting/getApprovals";
import { ICreditRequest } from "@services/types";
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
} from "@config/pages/board/outlet/financialReporting/configApprovals";
import { AppContext } from "@context/AppContext";

import { errorObserver } from "../config";
interface IApprovalsProps {
  user: string;
  isMobile: boolean;
  id: string;
}

export const Approvals = (props: IApprovalsProps) => {
  const { isMobile, id } = props;
  const [requests, setRequests] = useState<ICreditRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [approvalsEntries, setApprovalsEntries] = useState<IEntries[]>([]);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [selectedData, setSelectedData] = useState<IEntries | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { addFlag } = useFlag();
  const { businessUnitSigla } = useContext(AppContext);

  const businessUnitPublicCode: string =
    JSON.parse(businessUnitSigla).businessUnitPublicCode;

  const fetchCreditRequest = useCallback(async () => {
    try {
      const data = await getCreditRequestByCode(businessUnitPublicCode, id);
      setRequests(data[0] as ICreditRequest);
    } catch (error) {
      console.error(error);
      errorObserver.notify({
        id: "Management",
        message: (error as Error).message.toString(),
      });
    }
  }, [businessUnitPublicCode, id]);

  useEffect(() => {
    if (id) fetchCreditRequest();
  }, [fetchCreditRequest, id]);

  const fetchAprovalsData = useCallback(async () => {
    if (!requests?.creditRequestId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getAprovalsById(
        businessUnitPublicCode,
        requests.creditRequestId
      );
      if (data && Array.isArray(data)) {
        const entries: IEntries[] = entriesApprovals(data).map((entry) => ({
          ...entry,
          error: entry.concept === "Pendiente",
        }));
        setApprovalsEntries(entries);
      }
    } catch (error) {
      console.error(error);
      errorObserver.notify({
        id: "Aprovals",
        message: (error as Error).message.toString(),
      });
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [businessUnitPublicCode, requests?.creditRequestId]);

  useEffect(() => {
    fetchAprovalsData();
  }, [fetchAprovalsData]);

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
    fetchAprovalsData();
  };

  return (
    <>
      <Fieldset title="Aprobaciones" heightFieldset="100%" hasTable>
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

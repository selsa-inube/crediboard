import { useState, useEffect } from "react";
import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import { IEntries } from "@components/data/TableBoard/types";
import { Listmodal } from "@components/modals/Listmodal";
import {
  actionMobileApprovals,
  handleData,
  titlesApprovals,
  actionsApprovals,
  handleNotificationClick,
  desktopActions
} from "./config";

export const Approvals = () => {
  const [entriesApprovals, setEntriesApprovals] = useState<IEntries[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState<IEntries | null>(null);

  useEffect(() => {
    setLoading(true);
    handleData().then((data) => {
      setEntriesApprovals(data as IEntries[]);
      setLoading(false);
    });
  }, []);

  const handleNotificationClickBound = (data: IEntries) => {
    handleNotificationClick(data, setSelectedData, setShowModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSend = () => {
    handleCloseModal();
  };

  const desktopActionsConfig = desktopActions(actionsApprovals, handleNotificationClickBound);

  const mobileActions = actionMobileApprovals.map((action) => {
    return {
      id: action.id,
      actionName: action.actionName,
      content: (data: IEntries) => (
        <div
          className="notification-icon"
          onClick={() => {
            if (action.id === "notificaciones") {
              handleNotificationClickBound(data);
            } else if (action.id === "Error") {
              action.content(data);
            }
          }}
        >
          {action.content(data)}
        </div>
      ),
    };
  });

  return (
    <>
      <Fieldset
        title="Aprobaciones"
        heightFieldset="282px"
        aspectRatio="3/1"
        hasTable
      >
        <TableBoard
          id="usuarios"
          titles={titlesApprovals}
          entries={entriesApprovals}
          actions={desktopActionsConfig}
          actionMobile={mobileActions}
          loading={loading}
          nameTitleTag="decision"
        />
      </Fieldset>
      {showModal && selectedData && (
        <Listmodal
          title="Notificación"
          handleClose={handleCloseModal}
          buttonText="Enviar"
          handleButtonClick={handleSend}
          content={`¿Está seguro que desea enviar esta solicitud para aprobación? Se necesita evaluar esta solicitud.`}
        />
      )}
    </>
  );
};

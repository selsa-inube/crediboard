import { useState, useEffect } from "react";
import { isValidElement} from "react";
import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import { IEntries } from "@components/data/TableBoard/types";
import { Listmodal } from "@components/modals/Listmodal";
import {
  actionMobileApprovals,
  actionsApprovals,
  handleData,
  titlesApprovals,
} from "./config";

export const Approvals = () => {
  const [entriesApprovals, setEntriesApprovals] = useState<IEntries[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState<IEntries | null>(null);

  useEffect(() => {
    handleData().then((data) => {
      setEntriesApprovals(data as IEntries[]);
    });
  }, []);

  const handleNotificationClick = (data: IEntries) => {
    const tag = data?.tag;
    if (
      isValidElement(tag) &&
      (tag.props?.label === "Aprobado" || tag.props?.label === "Rechazado")
    ) {
      setSelectedData(data);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSend = () => {
    console.log("Sending data...");
    handleCloseModal();
  };

  return (
    <>
      <Fieldset
        title="Aprobaciones"
        heigthFieldset="282px"
        aspectRatio="3/1"
        hasTable
      >
        <TableBoard
          id="usuarios"
          titles={titlesApprovals}
          entries={entriesApprovals}
          actions={actionsApprovals.map((action) => ({
            ...action,
            content: (data: IEntries) => (
              <div
                className="notification-icon"
                onClick={() => {
                  if (action.id === "notificaciones") {
                    handleNotificationClick(data);
                  } else {
                    action.content(data);
                  }
                }}
              >
                {action.content(data)}
              </div>
            ),
          }))}
          actionMobile={actionMobileApprovals}
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

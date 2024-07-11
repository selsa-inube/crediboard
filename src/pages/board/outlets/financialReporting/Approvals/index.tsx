import { useState, useEffect } from "react";
import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@src/components/data/TableBoard";
import { actionsApprovals, handleData, titlesApprovals } from "./config";
import { IEntries } from "@src/components/data/TableBoard/types";
import { NotificationModal } from "@components/modals/NotificationModal";

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

  const handleNotificationClick = (data: IEntries) => {
    setSelectedData(data);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (values: { textarea: string }) => {
    console.log("Valores enviados:", values);
    handleCloseModal();
  };

  return (
    <>
      <Fieldset title="Aprobaciones" heigthFieldset="282px" aspectRatio="3/1">
        <TableBoard
          id="usuarios"
          titles={titlesApprovals}
          entries={entriesApprovals}
          actions={actionsApprovals.map((action) => ({
            ...action,
            content: (data: IEntries) => (
              <div onClick={() => handleNotificationClick(data)}>
                {action.content(data)}
              </div>
            ),
          }))}
          loading={loading}
        />
      </Fieldset>
      {showModal && selectedData && (
        <NotificationModal
          title="Notificación"
          buttonText="Enviar"
          confirmationText="Esta seguro de enviar nuevamente para notificación... esta solicitud para aprobación... la necesidad de evaluar esta solicitud."
          onSubmit={handleSubmit}
          onCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};

import { useEffect, useState } from "react";
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
              <div onClick={() => handleNotificationClick(data)}>
                {action.content(data)}
              </div>
            ),
          }))}
          loading={loading}
          actionMobile={actionMobileApprovals}
          nameTitleTag="decision"
        />
      </Fieldset>
      {showModal && selectedData && (
        <Listmodal
          title="Notificación" 
          handleClose={handleCloseModal} 
          confirmationText="Esta seguro que desea enviar esta solicitud para aprobación... la necesidad de evaluar esta solicitud."
        />
      )}
    </>
  );
};

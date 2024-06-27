import { useEffect, useState, isValidElement } from "react";
import { MdNotificationsNone, MdWarningAmber } from "react-icons/md";
import { Icon } from "@inube/design-system";

import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import { IEntries } from "@components/data/TableBoard/types";

import { handleData, titlesApprovals } from "./config";
import { AprovalsModal } from "./AprovalsModal";

export const Approvals = () => {
  const [entriesApprovals, setEntriesApprovals] = useState<IEntries[]>([]);
  const [showAprovalsModal, setShowAprovalsModal] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await handleData();
      setEntriesApprovals(data as IEntries[]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const toggleAprovalsModal = () => setShowAprovalsModal(!showAprovalsModal);
  const changeApprove = () => setIsApproved(!isApproved);

  const actionsApprovals = [
    {
      id: "Error",
      actionName: "Error",
      content: (data: IEntries) => (
        <Icon
          icon={<MdWarningAmber />}
          appearance="warning"
          spacing="compact"
          cursorHover
          size="24px"
          onClick={() => {}}
          disabled={
            isValidElement(data?.decision) &&
            data?.decision?.props?.label === "Pendiente"
          }
        />
      ),
    },
    {
      id: "notificaciones",
      actionName: "Notificar",
      content: (data: IEntries) => (
        <Icon
          icon={<MdNotificationsNone />}
          appearance="primary"
          spacing="compact"
          cursorHover
          size="24px"
          onClick={() => {
            setIsApproved(false);
            toggleAprovalsModal();
          }}
          disabled={
            isValidElement(data?.decision) &&
            data?.decision?.props?.label !== "Pendiente"
          }
        />
      ),
    },
  ];

  return (
    <>
      <Fieldset title="Aprobaciones" heigthFieldset="282px" aspectRatio="3/1">
        <TableBoard
          id="usuarios"
          titles={titlesApprovals}
          entries={entriesApprovals}
          actions={actionsApprovals}
          loading={loading}
        />
      </Fieldset>
      {showAprovalsModal && (
        <AprovalsModal
          title="Aprobaciones"
          buttonText="Confirmar"
          inputLabel="Observaciones de aprobación o rechazo"
          inputPlaceholder="Observaciones para la aprobación o rechazo."
          isApproved={isApproved}
          onCloseModal={toggleAprovalsModal}
          onSubmit={toggleAprovalsModal}
          onChangeApprove={changeApprove}
        />
      )}
    </>
  );
};

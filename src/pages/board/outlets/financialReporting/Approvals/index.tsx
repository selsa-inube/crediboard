import { useState, useEffect } from "react";
import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import { IEntries } from "@components/data/TableBoard/types";
import { ListModal } from "@src/components/modals/ListModal";
import { TextAreaModal } from "@src/components/modals/TextAreaModal";
import { Tag } from "@inubekit/tag";

import {
  actionMobileApprovals,
  titlesApprovals,
  actionsApprovals,
  handleNotificationClick,
  handleErrorClick,
  desktopActions,
  getMobileActionsConfig,
} from "./config";
import { get } from "@mocks/utils/dataMock.service";
import { approval_by_credit_request_Mock } from "@services/types";

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
}

export const Approvals = (props: IApprovalsProps) => {
  const { user } = props;
  const [entriesApprovals, setEntriesApprovals] = useState<IEntries[]>([]);
  const [loading, setLoading] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [selectedData, setSelectedData] = useState<IEntries | null>(null);

  useEffect(() => {
    setLoading(true);
    get<approval_by_credit_request_Mock[]>("approval").then((data) => {
      const entries = data
        .filter((client) => client.credit_request_id === user)
        .map((entry) => ({
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
    });
  }, [user]);

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
      {showNotificationModal && selectedData && (
        <ListModal
          title="Notificación"
          handleClose={() => setShowNotificationModal(false)}
          content={`¿Está seguro que desea enviar esta solicitud para aprobación? Se necesita evaluar esta solicitud.`}
          buttonLabel="Enviar"
        />
      )}
      {showErrorModal && selectedData && (
        <TextAreaModal
          title="Error"
          buttonText="Cerrar"
          inputLabel="Descripción del error"
          inputPlaceholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec mollis felis. Donec eget sapien viverra, tincidunt ex ut, ornare nisi. Nulla eget fermentum velit."
          readOnly
          onCloseModal={() => setShowErrorModal(false)}
        />
      )}
    </>
  );
};

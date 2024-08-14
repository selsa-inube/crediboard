import { useState, useEffect } from "react";
import { useMediaQuery } from "@inube/design-system";
import { Tag } from "@inubekit/tag";

import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import { IEntries } from "@components/data/TableBoard/types";
import { ListModal } from "@components/modals/ListModal";
import { TextAreaModal } from "@components/modals/TextAreaModal";

import {
  actionMobileApprovals,
  titlesApprovals,
  actionsApprovals,
  handleNotificationClick,
  handleErrorClick,
  desktopActions,
  getMobileActionsConfig,
} from "./config";
import { getDataById } from "@mocks/utils/dataMock.service";
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
    getDataById<approval_by_credit_request_Mock[]>(
      "approval",
      "credit_request_id",
      user
    ).then((data) => {
      setLoading(true);
      const entries = data!.map((entry) => ({
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
  const isMobile = useMediaQuery("(max-width: 720px)");

  return (
    <>
      <Fieldset title="Aprobaciones" heightFieldset="284px" hasTable>
        <TableBoard
          id="usuarios"
          titles={titlesApprovals}
          entries={entriesApprovals}
          actions={desktopActionsConfig}
          actionMobile={mobileActions}
          loading={loading}
          appearanceTable={{
            widthTd: !isMobile ? "100" : "61%",
            efectzebra: true,
            title: "primary",
            isStyleMobile: false,
          }}
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
          disableTextarea={true}
          onCloseModal={() => setShowErrorModal(false)}
        />
      )}
    </>
  );
};

import { useState, useEffect } from "react";
import { MdOutlineThumbUp } from "react-icons/md";
import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import { IEntries } from "@components/data/TableBoard/types";
import { ListModal } from "@src/components/modals/ListModal";
import { Tag } from "@inubekit/tag";
import { Flag } from "@inubekit/flag";

import {
  actionMobileApprovals,
  titlesApprovals,
  actionsApprovals,
  handleNotificationClick,
  desktopActions,
  getMobileActionsConfig,
} from "./config";
import { getDataById } from "@mocks/utils/dataMock.service";
import { approval_by_credit_request_Mock } from "@services/types";

import { StyledMessageContainer } from "../styles";

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
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState<IEntries | null>(null);
  const [showFlag, setShowFlag] = useState(false);

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
    handleNotificationClick(data, setSelectedData, setShowModal);
  };

  const desktopActionsConfig = desktopActions(
    actionsApprovals,
    handleNotificationClickBound
  );

  const mobileActions = getMobileActionsConfig(
    actionMobileApprovals,
    handleNotificationClickBound
  );

  const handleSubmit = () => {
    setShowFlag(true);
    setShowModal(false);
  };

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
        <ListModal
          title="Notificación"
          content={`¿Está seguro que desea enviar esta solicitud para aprobación? Se necesita evaluar esta solicitud.`}
          buttonLabel="Enviar"
          handleClose={handleSubmit}
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
    </>
  );
};

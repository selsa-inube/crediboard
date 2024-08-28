import { useState, useEffect } from "react";
import { MdOutlineThumbUp } from "react-icons/md";
import { Tag } from "@inubekit/tag";

import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import { IEntries } from "@components/data/TableBoard/types";
import { ListModal } from "@components/modals/ListModal";
import { TextAreaModal } from "@components/modals/TextAreaModal";
import { Flag } from "@inubekit/flag";
import {
  actionMobileApprovals,
  titlesApprovals,
  actionsApprovals,
  handleNotificationClick,
  handleErrorClick,
  desktopActions,
  getMobileActionsConfig,
  infoItems,
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
  isMobile: boolean;
}

export const Approvals = (props: IApprovalsProps) => {
  const { user, isMobile } = props;
  const [entriesApprovals, setEntriesApprovals] = useState<IEntries[]>([]);
  const [loading, setLoading] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
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
    setShowFlag(true);
    setShowNotificationModal(false);
  };

  const handleCloseModal = () => {
    setShowNotificationModal(false);
  };

  return (
    <>
      <Fieldset
        title="Aprobaciones"
        heightFieldset="277px"
        hasTable
        aspectRatio="1"
      >
        <TableBoard
          id="usuarios"
          titles={titlesApprovals}
          entries={entriesApprovals}
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
      </Fieldset>
      {showNotificationModal && selectedData && (
        <ListModal
          title="Notificación"
          content={`¿Está seguro que desea enviar esta solicitud para aprobación? Se necesita evaluar esta solicitud.`}
          buttonLabel="Enviar"
          handleClose={handleCloseModal}
          onSubmit={handleSubmit}
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

import { Stack, Icon, } from "@inube/design-system";
import { useState, isValidElement } from "react";
import { MdAddCircleOutline, MdOutlineCheckCircle, MdOutlineThumbUp } from "react-icons/md";
import { Flag } from "@inubekit/flag";

import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import { IAction, IEntries, ITitle } from "@components/data/TableBoard/types";

import { dataButton } from "./config";
import { SeeDetailsModal } from "./SeeDetailsModal";
import { AprovalsModal } from "./AprovalsModal";
import { StyledMessageContainer } from "../styles";

interface IData {
  id: string;
  titlesRequirements: ITitle[];
  entriesRequirements: IEntries[];
  actionsRequirements: IAction[];
  actionsMovile: IAction[];
}

export interface IRequirementsProps {
  data: IData[];
  isMobile: boolean;
}

export const Requirements = (props: IRequirementsProps) => {
  const { data, isMobile } = props;
  const [showSeeDetailsModal, setShowSeeDetailsModal] = useState(false);
  const [modalData, setModalData] = useState<{ date?: Date; details?: string }>({});
  const [showAprovalsModal, setShowAprovalsModal] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [showFlagMessage, setShowFlagMessage] = useState(false);

  const toggleAprovalsModal = () => setShowAprovalsModal(!showAprovalsModal);
  const changeApprove = () => setIsApproved(!isApproved);

  const handleToggleSeeDetailsModal = (date?: string, details?: string) => {
    setModalData({
      date: date ? new Date(date) : undefined,
      details,
    });
    setShowSeeDetailsModal((prevState) => !prevState);
  };

  const handleSubmitAprovals = () => {
    toggleAprovalsModal();
    setShowFlagMessage(true);
  };

  const renderAddIcon = (entry: IEntries) => {
    const date = typeof entry.date === "string" ? entry.date : undefined;
    const details = typeof entry.details === "string" ? entry.details : undefined;

    return (
      <Stack justifyContent="center">
        <Icon
          icon={<MdAddCircleOutline />}
          appearance="primary"
          onClick={() => handleToggleSeeDetailsModal(date, details)}
          spacing="compact"
          size="24px"
          cursorHover
        />
      </Stack>
    );
  };

  const renderCheckIcon = (entry: IEntries) => (
    <Stack justifyContent="center">
      <Icon
        icon={<MdOutlineCheckCircle />}
        appearance="primary"
        spacing="compact"
        cursorHover
        size="24px"
        onClick={() => {
          setIsApproved(false);
          toggleAprovalsModal();
        }}
        disabled={
          isValidElement(entry?.tag) && entry?.tag?.props?.label === "No Cumple"
        }
      />
    </Stack>
  );

  const actionsRequirements: IAction[] = [
    { id: "agregar", content: renderAddIcon },
    { id: "aprobar", content: renderCheckIcon },
  ];
  

  return (
    <>
      <Stack>
        <Fieldset
          title="Requisitos"
          activeButton={dataButton}
          heightFieldset="340px"
          hasTable
        >
            {data.map((item) => (
              <TableBoard
                key={item.id}
                id={item.id}
                titles={item.titlesRequirements}
                entries={item.entriesRequirements}
                actions={actionsRequirements}
                actionMobile={item.actionsMovile}
                appearanceTable={{
                  widthTd: !isMobile ? "75%" : "70%",
                  efectzebra: true,
                  title: "primary",
                  isStyleMobile: false,
                }}
              />
            ))}
        </Fieldset>
      </Stack>

      {showSeeDetailsModal && (
        <SeeDetailsModal
          date={modalData.date || new Date()}
          details={modalData.details || ""}
          onCloseModal={handleToggleSeeDetailsModal}
        />
      )}

      {showAprovalsModal && (
        <AprovalsModal
          title="Aprobaciones"
          buttonText="Confirmar"
          inputLabel="Observaciones de aprobación o rechazo"
          inputPlaceholder="Observaciones para la aprobación o rechazo."
          isApproved={isApproved}
          onCloseModal={toggleAprovalsModal}
          onSubmit={handleSubmitAprovals} 
          onChangeApprove={changeApprove}
        />
      )}
      {showFlagMessage && (
        <StyledMessageContainer>
          <Flag
            title="Éxito"
            description="La aprobación se ha completado correctamente."
            appearance="success"
            icon={<MdOutlineThumbUp />}
            duration={5000}
            isMessageResponsive={false}
            closeFlag={() => setShowFlagMessage(false)}
          />
        </StyledMessageContainer>
      )}
    </>
  );
};

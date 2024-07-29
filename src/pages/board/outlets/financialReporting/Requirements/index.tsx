import { Stack, Icon, useMediaQuery } from "@inube/design-system";
import { useState, isValidElement } from "react";
import { MdAddCircleOutline, MdCheck, MdClose, MdOutlineCheckCircle, MdRemove } from "react-icons/md";

import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import { IAction, IEntries, ITitle } from "@components/data/TableBoard/types";

import { dataButton } from "./config";
import { SeeDetailsModal } from "./SeeDetailsModal";
import { AprovalsModal } from "./AprovalsModal";

interface IData {
  id: string;
  titlesRequirements: ITitle[];
  entriesRequirements: IEntries[];
  actionsRequirements: IAction[];
  actionsMovile: IAction[];
}

export interface IRequirementsProps {
  data: IData[];
}

export const Requirements = (props: IRequirementsProps) => {
  const { data } = props;
  const [showSeeDetailsModal, setShowSeeDetailsModal] = useState(false);
  const [modalData, setModalData] = useState<{
    date?: Date;
    details?: string;
  }>({});
  const [showAprovalsModal, setShowAprovalsModal] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const toggleAprovalsModal = () => setShowAprovalsModal(!showAprovalsModal);
  const changeApprove = () => setIsApproved(!isApproved);

  const handleToggleSeeDetailsModal = (date?: string, details?: string) => {
    setModalData({
      date: date ? new Date(date) : undefined,
      details,
    });
    setShowSeeDetailsModal((prevState) => !prevState);
  };

  const renderAddIcon = (entry: IEntries) => {
    const date = typeof entry.date === "string" ? entry.date : undefined;
    const details =
      typeof entry.details === "string" ? entry.details : undefined;

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

  const isMobile = useMediaQuery("(max-width: 720px)");

  const infoItems = [
    { icon: <MdCheck />, text: "Cumple", appearance: "success", size: "20px", shape: "circle", variant: "filled" },
    { icon: <MdClose />, text: "No Cumple", appearance: "danger", size: "20px", shape: "circle", variant: "filled" },
    { icon: <MdRemove />, text: "Sin Evaluar", appearance: "warning", size: "20px", shape: "circle", variant: "filled" },
    { icon: <MdAddCircleOutline />, text: "Adjuntar", appearance: "help", size: "28px"},
    { icon: <MdOutlineCheckCircle />, text: "Forzar Aprobación", appearance: "help", size: "28px"},
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
          <div style={{ height: "340px" }}>
            {data.map((item, index) => (
              <TableBoard
                key={item.id}
                id={item.id}
                titles={item.titlesRequirements}
                entries={item.entriesRequirements}
                actions={actionsRequirements}
                actionMobile={item.actionsMovile}
                appearanceTable={{
                  widthTd: !isMobile ? "310px" : "60%",
                  efectzebra: true,
                  title: "primary",
                  isStyleMobile: true,
                }}
                isFirstTable={index === 0}
                infoItems={infoItems}
              />
            ))}
          </div>
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
          onSubmit={toggleAprovalsModal}
          onChangeApprove={changeApprove}
        />
      )}
    </>
  );
};

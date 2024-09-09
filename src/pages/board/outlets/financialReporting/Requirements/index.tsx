import { useState, isValidElement, useEffect } from "react";
import {
  MdAddCircleOutline,
  MdOutlineCheckCircle,
  MdOutlineThumbUp,
} from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { Flag } from "@inubekit/flag";
import { Stack } from "@inubekit/stack";

import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import { IAction, IEntries, ITitle } from "@components/data/TableBoard/types";
import { getById } from "@mocks/utils/dataMock.service";
import { CreditRequest } from "@services/types";

import {
  actionsMobile,
  dataButton,
  infoItems,
  maperDataRequirements,
  maperEntries,
} from "./config";
import { SeeDetailsModal } from "./SeeDetailsModal";
import { AprovalsModal } from "./AprovalsModal";
import { StyledMessageContainer } from "../styles";

interface IRequirementsData {
  id: string;
  titlesRequirements: ITitle[];
  entriesRequirements: IEntries[];
  actionsMovile: IAction[];
}

export interface IRequirementsProps {
  isMobile: boolean;
  id: string;
}

export const Requirements = (props: IRequirementsProps) => {
  const { isMobile, id } = props;
  const [showSeeDetailsModal, setShowSeeDetailsModal] = useState(false);
  const [modalData, setModalData] = useState<{ date?: Date; details?: string }>(
    {}
  );
  const [showAprovalsModal, setShowAprovalsModal] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [showFlagMessage, setShowFlagMessage] = useState(false);

  const [dataRequirements, setDataRequirements] = useState<IRequirementsData[]>(
    []
  );

  useEffect(() => {
    (async () => {
      try {
        const requirements = await getById<CreditRequest>(
          "requirements",
          "credit_request_id",
          id
        );

        if (!(requirements instanceof Error)) {
          const processedEntries = maperEntries(requirements);
          const processedRequirements = maperDataRequirements(processedEntries);

          setDataRequirements(processedRequirements);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

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

  return (
    <>
      <Stack>
        <Fieldset
          title="Requisitos"
          activeButton={dataButton}
          heightFieldset="340px"
          hasTable
        >
          {dataRequirements.map((item, index) => (
            <TableBoard
              key={item.id}
              id={item.id}
              titles={item.titlesRequirements}
              entries={item.entriesRequirements}
              actions={actionsRequirements}
              actionMobile={actionsMobile}
              appearanceTable={{
                widthTd: !isMobile ? "75%" : "70%",
                efectzebra: true,
                title: "primary",
                isStyleMobile: true,
              }}
              isFirstTable={index === 0}
              infoItems={infoItems}
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

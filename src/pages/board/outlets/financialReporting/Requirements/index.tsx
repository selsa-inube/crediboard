import { useAuth0 } from "@auth0/auth0-react";

import { Stack, Icon, } from "@inube/design-system";
import { useState, isValidElement } from "react";
import { MdAddCircleOutline, MdOutlineCheckCircle, MdOutlineThumbUp } from "react-icons/md";
import { Flag } from "@inubekit/flag";

import { useParams } from "react-router-dom";
import { Fieldset } from "@components/data/Fieldset";
import { TableBoard } from "@components/data/TableBoard";
import { Management } from "../management";
import { IAction, IEntries, ITitle } from "@components/data/TableBoard/types";
import { addItem } from "@mocks/utils/dataMock.service";

import { dataButton, infoItems } from "./config";
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
  const [flagMessage, setFlagMessage] = useState({
    title: "",
    description: "",
    appearance: "success" as "success" | "danger",
  });
  const [upDateData, setUpDateData] = useState(false);

  const toggleAprovalsModal = () => setShowAprovalsModal(!showAprovalsModal);
  const changeApprove = () => setIsApproved(!isApproved);

  const { id } = useParams();
  const { user } = useAuth0();

  const handleToggleSeeDetailsModal = (date?: string, details?: string) => {
    setModalData({
      date: date ? new Date(date) : undefined,
      details,
    });
    setShowSeeDetailsModal((prevState) => !prevState);
  };

  const handleUpdateData = (state: boolean) => {
    setUpDateData(state);
  };

  const handleSubmitAprovals = async (
    id: string,
    user: string,
    formData: { textarea: string },
    setFlagMessage: (message: {
      title: string;
      description: string;
      appearance: "success" | "danger";
    }) => void,
    setShowFlagMessage: (state: boolean) => void,
    setShowApprovalstModal: (state: boolean) => void,
    handleUpdateData: (state: boolean) => void
  ) => {
    handleUpdateData(false);
    const justificationText = formData.textarea;
  
    if (justificationText && id) {
      const trace = {
        trace_id: crypto.randomUUID(),
        trace_value: "Document approved",
        credit_request_id: id,
        use_case: "document_upload",
        user_id: user,
        execution_date: new Date().toISOString(),
        justification: justificationText,
        decision_taken_by_user: "approved",
        trace_type: "novelty_document",
        read_novelty: "N",
      };
  
      const handleSuccess = () => {
        setFlagMessage({
          title: "Exito",
          description: "La aprobación se ha completado correctamente.",
          appearance: "success",
        });
        setShowFlagMessage(true);
        setShowAprovalsModal(false);
        handleUpdateData(true);
      };
  
      const handleError = (error: Error) => {
        setFlagMessage({
          title: "Aprobación Fallida",
          description: `No se ha podido realizar la aprobación: ${error}`,
          appearance: "danger",
        });
        setShowFlagMessage(true);
        setShowApprovalstModal(false);
      };
  
      try {
        await addItem("trace", trace);
        handleSuccess();
      } catch (error) {
        handleError(error as Error);
      }
    }
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
            {data.map((item, index) => (
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
                  isStyleMobile: true,
                }}
                isFirstTable={index === 0}
                infoItems={infoItems}
              />
            ))}
        </Fieldset>
      </Stack>

      {false && <Management id={id!} isMobile={isMobile} updateData={upDateData} />}

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
          onCloseModal={() => setShowAprovalsModal(false)}
          onChangeApprove={changeApprove}
          onSubmit={(values) =>
            handleSubmitAprovals(
              id!,
              user!.nickname!,
              values,
              setFlagMessage,
              setShowFlagMessage,
              setShowAprovalsModal,
              handleUpdateData
            )
          }
        />
      )}
      {showFlagMessage && (
        <StyledMessageContainer>
        <Flag
          title={flagMessage.title}
          description={flagMessage.description}
          appearance={flagMessage.appearance}
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


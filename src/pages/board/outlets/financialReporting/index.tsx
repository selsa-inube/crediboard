import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MdDeleteOutline,
  MdOutlineRemoveRedEye,
  MdOutlineThumbUp,
} from "react-icons/md";
import { Text, inube, Grid, useMediaQuery } from "@inube/design-system";
import { Icon } from "@inubekit/icon";
import { Flag } from "@inubekit/flag";
import { Stack } from "@inubekit/stack";

import { ContainerSections } from "@components/layout/ContainerSections";
import { ErrorAlert } from "@components/ErrorAlert";
import { ListModal } from "@components/modals/ListModal";
import { StockTray } from "@src/components/layout/ContainerSections/StockTray";
import { TextAreaModal } from "@components/modals/TextAreaModal";
import { ComercialManagement } from "@pages/board/outlets/financialReporting/CommercialManagement";
import { dataAccordeon } from "@pages/board/outlets/financialReporting/CommercialManagement/config/config";
import { DataCommercialManagement } from "@pages/board/outlets/financialReporting/CommercialManagement/TableCommercialManagement";
import { getById, getDataById } from "@mocks/utils/dataMock.service";
import { Idocument, Ierror_issued, Requests } from "@services/types";
import { generatePDF } from "@utils/pdf/generetePDF";

import { infoIcon } from "./ToDo/config";
import { ToDo } from "./ToDo";
import {
  configHandleactions,
  handleConfirmReject,
  handleConfirmCancel,
  optionButtons,
} from "./config";
import { StyledItem, StyledMessageContainer, StyledToast } from "./styles";
import { Approvals } from "./Approvals";
import { Requirements } from "./Requirements";
import { dataRequirements } from "./Requirements/config";
import { Management } from "./management";
import { PromissoryNotes } from "./PromissoryNotes";
import { Postingvouchers } from "./Postingvouchers";
import { MobileMenu } from "@src/components/modals/MobileMenu";

interface IListdataProps {
  data: { id: string; name: string }[];
  icon?: React.ReactNode;
}

const Listdata = (props: IListdataProps) => {
  const { data, icon } = props;

  if (data.length === 0) {
    return <Text>No hay documentos adjuntos.</Text>;
  }

  return (
    <ul
      style={{
        paddingInlineStart: "2px",
        marginBlock: "8px",
      }}
    >
      {data.map((element) => (
        <StyledItem key={element.id}>
          <Text>{element.name}</Text>
          <Icon
            icon={icon}
            appearance="dark"
            spacing="none"
            size="24px"
            cursorHover
          />
        </StyledItem>
      ))}
    </ul>
  );
};

export const FinancialReporting = () => {
  const [data, setData] = useState({} as Requests);

  const [showAttachments, setShowAttachments] = useState(false);
  const [attachDocuments, setAttachDocuments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showFlagMessage, setShowFlagMessage] = useState(false);
  const [flagMessage, setFlagMessage] = useState({
    title: "",
    description: "",
    appearance: "success" as "success" | "danger",
  });

  const [document, setDocument] = useState<IListdataProps["data"]>([]);
  const [errors, setError] = useState<Ierror_issued[]>([]);

  const { id } = useParams();
  const navigation = useNavigate();

  const isMobile: boolean = useMediaQuery("(max-width: 880px)");

  const dataCommercialManagementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.allSettled([
      getById("k_Prospe", "requests", id!),
      getDataById<Idocument[]>("document", "credit_request_id", id!),
      getDataById<Ierror_issued[]>("error_issued", "credit_request_id", id!),
    ]).then(([requirement, documents, error_issue]) => {
      if (requirement.status === "fulfilled") {
        setData(requirement.value as Requests);
      }
      if (documents.status === "fulfilled" && documents.value) {
        const documentsUser = documents.value.map((dataListDocument) => ({
          id: dataListDocument.document_id,
          name: dataListDocument.abbreviated_name,
        }));
        setDocument(documentsUser);
      }
      if (error_issue.status === "fulfilled") {
        setError(error_issue.value!);
      }
    });
  }, [id]);

  const [isPrint, setIsPrint] = useState(false);

  const handleGeneratePDF = () => {
    setIsPrint(true);
    setTimeout(() => {
      generatePDF(
        dataCommercialManagementRef,
        "Gestión Comercial",
        "Gestión Comercial"
      );
    }, 1000);
  };

  const handleActions = configHandleactions({
    buttonReject: () => setShowRejectModal(true),
    buttonCancel: () => setShowCancelModal(true),
    buttonPrint: () => {},
    buttonAttach: () => setShowAttachments(true),
    buttonViewAttachments: () => setAttachDocuments(true),
    menuIcon: () => setShowMenu(true),
  });

  const handleClose = (errorId: string) => {
    setError(errors.filter((error) => error.error_issued_id !== errorId));
  };

  const handleOnCancel = () => {
    setShowCancelModal(true);
    setShowMenu(false);
  };

  const hanleOnReject = () => {
    setShowRejectModal(true);
    setShowMenu(false);
  };

  const handleOnAttach = () => {
    setShowAttachments(true);
    setShowMenu(false);
  };

  const handleOnViewAttachments = () => {
    setAttachDocuments(true);
    setShowMenu(false);
  };

  return (
    <Stack direction="column" margin={!isMobile ? "20px 40px" : "20px"}>
      {errors.length > 0 && (
        <Stack justifyContent="center" alignContent="center">
          <StyledToast $isMobile={isMobile}>
            {errors.map((error) => (
              <ErrorAlert
                message={error.error_description}
                onClose={() => handleClose(error.error_issued_id)}
                key={error.error_issued_id}
              />
            ))}
          </StyledToast>
        </Stack>
      )}

      <ContainerSections
        isMobile={isMobile}
        stockTray={
          <StockTray
            isMobile={isMobile}
            actionButtons={handleActions}
            navigation={() => navigation(-1)}
          />
        }
      >
        <>
          <Stack direction="column" gap={inube.spacing.s250}>
            <Stack direction="column">
              <Stack direction="column">
                <ComercialManagement
                  print={handleGeneratePDF}
                  data={data}
                  children={
                    <DataCommercialManagement
                      dataAccordeon={dataAccordeon}
                      isOpen={isPrint}
                      dataRef={dataCommercialManagementRef}
                    />
                  }
                />
              </Stack>
            </Stack>
            <Grid
              templateColumns={!isMobile ? "repeat(2,1fr)" : "1fr"}
              gap="s200"
              autoRows="auto"
            >
              <Stack direction="column">
                {<ToDo icon={infoIcon} isMobile={isMobile} />}
              </Stack>
              <Stack direction="column">{<Approvals user={id!} isMobile={isMobile}/>}</Stack>
              <Stack direction="column">
                {<Requirements data={dataRequirements} isMobile={isMobile}/>}
              </Stack>
              <Stack direction="column">{<Management />}</Stack>
              <Stack direction="column">{<PromissoryNotes user={id!} isMobile={isMobile}/>}</Stack>
              <Stack direction="column">{<Postingvouchers />}</Stack>
            </Grid>
          </Stack>
          {showAttachments && (
            <ListModal
              title="Adjuntar"
              content={<Listdata data={document} icon={<MdDeleteOutline />} />}
              handleClose={() => setShowAttachments(false)}
              optionButtons={optionButtons}
              buttonLabel="Cerrar"
            />
          )}
          {attachDocuments && (
            <ListModal
              title="Ver Adjuntos"
              content={
                <Listdata data={document} icon={<MdOutlineRemoveRedEye />} />
              }
              handleClose={() => setAttachDocuments(false)}
              buttonLabel="Cerrar"
            />
          )}
        </>
      </ContainerSections>
      {showRejectModal && (
        <TextAreaModal
          title="Rechazar"
          buttonText="Confirmar"
          inputLabel="Motivo del Rechazo."
          inputPlaceholder="Describa el motivo del Rechazo."
          onCloseModal={() => setShowRejectModal(false)}
          onSubmit={(values) =>
            handleConfirmReject(
              values,
              setFlagMessage,
              setShowFlagMessage,
              setShowRejectModal
            )
          }
        />
      )}
      {showCancelModal && (
        <TextAreaModal
          title="Anular"
          buttonText="Confirmar"
          inputLabel="Motivo de la anulación."
          inputPlaceholder="Describa el motivo de la anulación."
          onCloseModal={() => setShowCancelModal(false)}
          onSubmit={(values) =>
            handleConfirmCancel(
              values,
              setFlagMessage,
              setShowFlagMessage,
              setShowCancelModal
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
      {showMenu && isMobile && (
        <MobileMenu
          onClose={() => setShowMenu(false)}
          onReject={hanleOnReject}
          onCancel={handleOnCancel}
          onAttach={handleOnAttach}
          onViewAttachments={handleOnViewAttachments}
        />
      )}
    </Stack>
  );
};

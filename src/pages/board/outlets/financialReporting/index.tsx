import { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

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

import { ErrorAlert } from "@components/ErrorAlert";
import { ContainerSections } from "@components/layout/ContainerSections";
import { StockTray } from "@components/layout/ContainerSections/StockTray";
import { ListModal } from "@components/modals/ListModal";
import { MobileMenu } from "@components/modals/MobileMenu";
import { TextAreaModal } from "@components/modals/TextAreaModal";
import { ComercialManagement } from "@pages/board/outlets/financialReporting/CommercialManagement";
import { getById } from "@mocks/utils/dataMock.service";
import { Ierror_issued, IErrorService, Requests } from "@services/types";
import { generatePDF } from "@utils/pdf/generetePDF";

import { infoIcon } from "./ToDo/config";
import { ToDo } from "./ToDo";
import {
  configHandleactions,
  handleConfirmReject,
  handleConfirmCancel,
  optionButtons,
  errorObserver,
} from "./config";
import { StyledItem, StyledMessageContainer, StyledToast } from "./styles";
import { Approvals } from "./Approvals";
import { Requirements } from "./Requirements";
import { Management } from "./management";
import { PromissoryNotes } from "./PromissoryNotes";
import { Postingvouchers } from "./Postingvouchers";
import { getCreditRequestByCode } from "@services/creditRequets/getCreditRequestByCode";
import { CardCommercialManagement } from "./CommercialManagement/CardCommercialManagement";

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

const removeErrorByIdServices = (
  errorsList: IErrorService[],
  errorId: string
) => {
  return errorsList.filter((error) => error.id !== errorId);
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
  const { user } = useAuth0();

  const navigation = useNavigate();

  const isMobile: boolean = useMediaQuery("(max-width: 880px)");

  const dataCommercialManagementRef = useRef<HTMLDivElement>(null);

  const [errorsService, setErrorsService] = useState<IErrorService[]>([]);

  useEffect(() => {
    Promise.allSettled([
      getById("document", "credit_request_id", id!, true),
      getById("error_issued", "credit_request_id", id!, true),
    ]).then(([documents, error_issue]) => {
      if (documents.status === "fulfilled" && Array.isArray(documents.value)) {
        const documentsUser = documents.value.map((dataListDocument) => ({
          id: dataListDocument.document_id,
          name: dataListDocument.abbreviated_name,
        }));
        setDocument(documentsUser);
      }
      if (error_issue.status === "fulfilled") {
        setError(error_issue.value as Ierror_issued[]);
      }
    });

    getCreditRequestByCode(id!).then((data) => {
      setData(data[0]);
    }).
    catch((error) => {
      console.error(error);
    });
  }, [id]);

  useEffect(() => {
    const handleErrorsService = (newError: IErrorService) => {
      setErrorsService((prevErrors) => {
        let updatedErrors = [...prevErrors];

        const errorExists = updatedErrors.some(
          (error) => error.id === newError.id
        );

        if (!errorExists) {
          updatedErrors = [...updatedErrors, newError];
        } else {
          updatedErrors = updatedErrors.map((i) =>
            i.id === newError.id ? newError : i
          );
        }

        return updatedErrors;
      });
    };

    errorObserver.subscribe(handleErrorsService);

    return () => {
      errorObserver.unsubscribe(handleErrorsService);
    };
  }, []);

  const handleGeneratePDF = () => {
    setTimeout(() => {
      generatePDF(
        dataCommercialManagementRef,
        "Gestión Comercial",
        "Gestión Comercial",
        { top: 10, bottom: 10, left: 10, right: 10 }
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

  const handleCloseErrorService = (errorId: string) => {
    setErrorsService(removeErrorByIdServices(errorsService, errorId));
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
      {errors && (
        <Stack justifyContent="center" alignContent="center">
          <StyledToast $isMobile={isMobile}>
            {errors.map((error) => (
              <ErrorAlert
                message={error.error_description}
                onClose={() => handleClose(error.error_issued_id)}
                key={error.error_issued_id}
              />
            ))}

            {errorsService.length > 0 &&
              errorsService.map((errorService) => (
                <ErrorAlert
                  message={errorService.message.toString()}
                  onClose={() => handleCloseErrorService(errorService.id)}
                  key={errorService.id}
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
                    <CardCommercialManagement
                      id={id!}
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
                <ToDo
                  icon={infoIcon}
                  isMobile={isMobile}
                  id={id!}
                  user={user!.nickname!}
                />
              </Stack>
              <Stack direction="column">
                <Approvals user={id!} isMobile={isMobile} />
              </Stack>
              <Stack direction="column">
                <Requirements
                  isMobile={isMobile}
                  id={id!}
                  user={user!.nickname!}
                />
              </Stack>
              <Stack direction="column">
                <Management id={id!} isMobile={isMobile} />
              </Stack>
              <Stack direction="column">
                <PromissoryNotes user={id!} isMobile={isMobile} />
              </Stack>
              <Stack direction="column">
                <Postingvouchers />
              </Stack>
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
              id!,
              user!.nickname!,
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
              id!,
              user!.nickname!,
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

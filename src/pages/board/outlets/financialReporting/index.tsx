import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MdDeleteOutline,
  MdOutlineRemoveRedEye,
  MdOutlineThumbUp,
} from "react-icons/md";
import { Stack, Text, inube, Grid, useMediaQuery } from "@inube/design-system";
import { Icon } from "@inubekit/icon";
import { Flag } from "@inubekit/flag";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { ContainerSections } from "@components/layout/ContainerSections";
import { Listmodal } from "@components/modals/Listmodal";
import { TextAreaModal } from "@components/modals/TextAreaModal";
import { ComercialManagement } from "@pages/board/outlets/financialReporting/CommercialManagement";
import { dataAccordeon } from "@pages/board/outlets/financialReporting/CommercialManagement/config/config";
import { DataCommercialManagement } from "@pages/board/outlets/financialReporting/CommercialManagement/TableCommercialManagement";
import { getById } from "@mocks/utils/dataMock.service";
import { Requests } from "@services/types";
import { SelectModal } from "@components/modals/SelectModal";

import { infoIcon } from "./ToDo/config";
import { ToDo } from "./ToDo";
import {
  configDataAttachments,
  handleConfirmReject,
  handleConfirmCancel,
  optionButtons,
  optionsPrintFormat,
} from "./config";
import { StyledItem, StyledMessageContainer } from "./styles";

export interface IFinancialReportingProps {
  requirements?: JSX.Element | JSX.Element[];
  promissoryNotes?: JSX.Element | JSX.Element[];
  approvals?: JSX.Element | JSX.Element[];
  management?: JSX.Element | JSX.Element[];
  postingVouchers?: JSX.Element | JSX.Element[];
}

interface IListdataProps {
  data: { id: string; name: string }[];
  icon?: React.ReactNode;
}

const Listdata = (props: IListdataProps) => {
  const { data, icon } = props;

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

export const FinancialReporting = (props: IFinancialReportingProps) => {
  const {
    requirements,
    promissoryNotes,
    approvals,
    management,
    postingVouchers,
  } = props;

  const [data, setData] = useState({} as Requests);

  const [showAttachments, setShowAttachments] = useState(false);
  const [attachDocuments, setAttachDocuments] = useState(false);

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showFlagMessage, setShowFlagMessage] = useState(false);
  const [flagMessage, setFlagMessage] = useState({
    title: "",
    description: "",
    appearance: "success" as "success" | "danger",
  });

  const { id } = useParams();

  const isMobile: boolean = useMediaQuery("(max-width: 720px)");

  useEffect(() => {
    getById("k_Prospe", "requests", id!).then((requirement) => {
      setData(requirement);
    });
  }, [id]);

  const handleAction = {
    buttons: {
      buttonReject: {
        OnClick: () => setShowRejectModal(true),
      },
      buttonCancel: {
        OnClick: () => setShowCancelModal(true),
      },
      buttonPrint: {
        OnClick: () => setShowPrintModal(true),
      },
    },
    buttonsOutlined: {
      buttonAttach: {
        OnClick: () => setShowAttachments(true),
      },
      buttonViewAttachments: {
        OnClick: () => setAttachDocuments(true),
      },
    },
  };

  const generatePDF = async () => {
    const pdfContainer = document.getElementById("pdfFinancialReporting");

    if (!pdfContainer) {
      return;
    }

    const canvas = await html2canvas(pdfContainer);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("l", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    const margins = {
      top: 20,
      bottom: 0,
      left: 10,
      right: 10,
    };

    const contentWidth = pdfWidth - margins.left - margins.right;
    const contentHeight = pdfHeight - margins.top - margins.bottom;

    pdf.addImage(
      imgData,
      "PNG",
      margins.left,
      margins.top,
      contentWidth,
      contentHeight
    );

    pdf.save("financial-reporting.pdf");
  };

  const handleSubmitSelectedFormat = (value: string) => {
    setShowPrintModal(false);

    if (value === "Pdf") {
      generatePDF();
    }
  };

  return (
    <Stack direction="column" margin={!isMobile ? "s250 s500" : "s250"}>
      <ContainerSections isMobile={isMobile} actionButtons={handleAction}>
        <>
          <Stack direction="column" gap={inube.spacing.s250}>
            <Stack direction="column">
              <Stack direction="column">
                <ComercialManagement
                  data={data}
                  children={
                    <DataCommercialManagement dataAccordeon={dataAccordeon} />
                  }
                />
              </Stack>
            </Stack>
            <div id="pdfFinancialReporting">
              <Grid
                templateColumns={!isMobile ? "repeat(2,1fr)" : "1fr"}
                gap="s200"
                autoRows="auto"
              >
                <Stack direction="column">
                  {<ToDo icon={infoIcon} data={data} isMobile={isMobile} />}
                </Stack>
                <Stack direction="column">{approvals}</Stack>
                <Stack direction="column">{requirements}</Stack>
                <Stack direction="column">{management}</Stack>
                <Stack direction="column">{promissoryNotes}</Stack>
                <Stack direction="column">{postingVouchers}</Stack>
              </Grid>
            </div>
          </Stack>
          {showAttachments && (
            <Listmodal
              title="Adjuntar"
              content={
                <Listdata
                  data={configDataAttachments}
                  icon={<MdDeleteOutline />}
                />
              }
              handleClose={() => setShowAttachments(false)}
              optionButtons={optionButtons}
            />
          )}
          {attachDocuments && (
            <Listmodal
              title="Ver Adjuntos"
              content={
                <Listdata
                  data={configDataAttachments}
                  icon={<MdOutlineRemoveRedEye />}
                />
              }
              handleClose={() => setAttachDocuments(false)}
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
      {showPrintModal && (
        <SelectModal
          title="Imprimir"
          buttonText="Imprimir"
          inputLabel="Seleccionar Formato"
          inputPlaceholder="Seleccione una opción"
          options={optionsPrintFormat}
          onSubmit={handleSubmitSelectedFormat}
          onCloseModal={() => setShowPrintModal(false)}
        />
      )}
    </Stack>
  );
};
